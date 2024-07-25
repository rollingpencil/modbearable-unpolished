import { retrieveSpecificMods } from "@/utils/nusmods-client";
import { PlannerCourseType, PlanarDataType } from "@/types/";
import { topologicalSort, generateSchedule } from "./algorithm";
import { Corben } from "next/font/google";
const fetchAndFilterPrerequisites = async (
  courseCode: string,
  courses: PlannerCourseType[],
  cohort: string,
  wildcard: boolean,
) => {
  try {
    const courseData = await retrieveSpecificMods(cohort, courseCode, wildcard);

    const prereqTree = courseData.prereqTree || {};
    const courseCodes = courses.reduce(
      (acc, course) => {
        if (!course.exempted) acc[course.code] = true; // includes non exempted courses

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
  course: PlannerCourseType,
  allCourses: PlannerCourseType[],
  cohort: string,
  courseMap: Record<string, PlannerCourseType>,
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

export const combineCourses = (
  jsonData: PlanarDataType,
): Record<string, PlannerCourseType> => {
  const combined: Record<string, PlannerCourseType> = {};
  const addCoursesToCombined = (courses: PlannerCourseType[]) => {
    courses.forEach((course) => {
      combined[course.code] = course;
    });
  };

  addCoursesToCombined(jsonData.base_requirements);
  addCoursesToCombined(jsonData.non_base_exemptions);
  addCoursesToCombined(jsonData.user_defined_courses);

  return combined;
};
// method signature for future implementation
export const scheduleCourse = async (
  jsonData: PlanarDataType,
  setData: Function,
  maxCredit: number,
  maxCoreCredit: number,
) => {
  // combine json into one data dictionary
  const CourseDict = combineCourses(jsonData);
  // using topological sort to process the data
  const sortedCourses = topologicalSort(CourseDict);

  // schedule the data

  //jsonData.user_schedule = schedule;
  return jsonData;
};
const dependencyCheck = async (
  jsonData: PlanarDataType,
  setData: Function,
) => {};

export const processJsonData = async (
  jsonData: PlanarDataType,
  setData: Function,
) => {
  console.log("Populating Prerequisite Data");
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
      {} as Record<string, PlannerCourseType>,
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

    setData(jsonData);
  } catch (error) {
    console.error(
      "Error processing JSON data:",
      error instanceof Error ? error.message : error,
    );
  }
};
