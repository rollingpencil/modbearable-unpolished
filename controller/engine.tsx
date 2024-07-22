import { retrieveSpecificMods } from "@/utils/nusmods-client";

interface Course {
  code: string;
  name: string;
  credits: number;
  exempted: boolean;
  wildcard: boolean;
  courseType: string;
  add_prerequisites: string[];
  take_together: string[];
  prerequisites: any;
  semestersOffered: number[];
  fulfillRequirements: string[];
}

interface JSONData {
  base_requirements: Course[];
  non_base_exemptions: Course[];
  user_defined_courses: Course[];
  cohort: string;
}

interface OutputCourse {
  code: string;
  name: string;
  credits: number;
  courseType: string;
  prerequisites: any;
  semestersOffered: number[];
  fulfillRequirements: string[];
}

const fetchAndFilterPrerequisites = async (
  courseCode: string,
  courses: Course[],
  cohort: string,
  wildcard: boolean,
) => {
  try {
    const courseData = await retrieveSpecificMods(cohort, courseCode, wildcard);

    const prereqTree = courseData.prereqTree || {};
    const courseCodes = courses.reduce(
      (acc, course) => {
        if (!course.exempted) acc[course.code] = true; // Only include non-exempted courses
        return acc;
      },
      {} as Record<string, boolean>,
    );

    const filterPrerequisites = (prereq: any): any => {
      if (typeof prereq === "string") {
        const courseCode = prereq.split(":")[0];
        return courseCodes[courseCode] ? courseCode : null;
      } else if (prereq.and) {
        return { and: prereq.and.map(filterPrerequisites).filter(Boolean) };
      } else if (prereq.or) {
        return { or: prereq.or.map(filterPrerequisites).filter(Boolean) };
      }
      return null;
    };

    const filteredPrereqTree = filterPrerequisites(prereqTree);
    const semestersOffered = courseData.semesterData.map(
      (sem: { semester: any }) => sem.semester,
    );

    return {
      prerequisites: filteredPrereqTree,
      semestersOffered,
      fulfillRequirements: courseData.fulfillRequirements || [],
    };
  } catch (error) {
    console.error(
      `Error fetching prerequisites for ${courseCode}:`,
      error instanceof Error ? error.message : error,
    );
    return {
      prerequisites: [],
      semestersOffered: [],
      fulfillRequirements: [],
    };
  }
};

const processCourseData = async (
  course: Course,
  allCourses: Course[],
  cohort: string,
  courseMap: Record<string, Course>,
) => {
  const prerequisitesInfo = await fetchAndFilterPrerequisites(
    course.code,
    allCourses,
    cohort,
    course.wildcard,
  );

  // Handle manual prerequisites
  const manualPrerequisites = course.add_prerequisites.filter(
    (prereqCode) => courseMap[prereqCode] && !courseMap[prereqCode].exempted,
  );
  if (manualPrerequisites.length === 0) {
    let formattedPrerequisites;
    if (typeof prerequisitesInfo.prerequisites === "object") {
      formattedPrerequisites = prerequisitesInfo.prerequisites;
    } else if (typeof prerequisitesInfo.prerequisites === "string") {
      formattedPrerequisites = {
        "0": prerequisitesInfo.prerequisites,
      };
    }
    return {
      ...course,
      prerequisites: formattedPrerequisites,
      semestersOffered: prerequisitesInfo.semestersOffered,
      fulfillRequirements: prerequisitesInfo.fulfillRequirements,
    };
  } else {
    if (prerequisitesInfo.prerequisites === null) {
      prerequisitesInfo.prerequisites = manualPrerequisites;
    }

    return {
      ...course,
      prerequisites: {
        ...prerequisitesInfo.prerequisites,
      },
      semestersOffered: prerequisitesInfo.semestersOffered,
      fulfillRequirements: prerequisitesInfo.fulfillRequirements,
    };
  }
};
// method signature for future implementation
const scheduleCourse = async (jsonData: JSONData) => {};
const dependencyCheck = async (jsonData: JSONData) => {};

const processJsonData = async (jsonData: JSONData) => {
  try {
    // Combine all courses
    const allCourses = [
      ...jsonData.base_requirements,
      ...jsonData.non_base_exemptions,
      ...jsonData.user_defined_courses,
    ];

    const courseMap = allCourses.reduce(
      (map, course) => {
        map[course.code] = course;
        return map;
      },
      {} as Record<string, Course>,
    );

    // Ensure bidirectional take_together relationships
    allCourses.forEach((course) => {
      course.take_together.forEach((code) => {
        if (
          courseMap[code] &&
          !courseMap[code].take_together.includes(course.code)
        ) {
          courseMap[code].take_together.push(course.code);
        }
      });
    });

    const updatedBaseRequirements = await Promise.all(
      jsonData.base_requirements.map((course) =>
        processCourseData(course, allCourses, jsonData.cohort, courseMap),
      ),
    );

    const updatedNonBaseExemptions = await Promise.all(
      jsonData.non_base_exemptions.map((course) =>
        processCourseData(course, allCourses, jsonData.cohort, courseMap),
      ),
    );

    const updatedUserDefinedCourses = await Promise.all(
      jsonData.user_defined_courses.map((course) =>
        processCourseData(course, allCourses, jsonData.cohort, courseMap),
      ),
    );

    // Updating jsonData with the new course information
    jsonData.base_requirements = updatedBaseRequirements;
    jsonData.non_base_exemptions = updatedNonBaseExemptions;
    jsonData.user_defined_courses = updatedUserDefinedCourses;
  } catch (error) {
    console.error(
      "Error processing JSON data:",
      error instanceof Error ? error.message : error,
    );
    return [];
  }
};

export { processJsonData };
export type { JSONData, Course, OutputCourse };
