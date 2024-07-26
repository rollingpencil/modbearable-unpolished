import { retrieveSpecificMods } from "@/utils/nusmods-client";
import { PlannerCourseType, PlanarDataType } from "@/types/";
import { topologicalSort, generateSchedule, convertToDict } from "./algorithm";
import { Corben } from "next/font/google";
type CourseDict = { [key: string]: PlannerCourseType };

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
function cleanCourses(courseArray: PlannerCourseType[]) {
  return courseArray.filter((course) => course != null);
}

// method signature for future implementation
export const scheduleCourse = async (
  jsonData: PlanarDataType,
  setData: Function,
  maxCredit: number,
  maxCoreCredit: number,
) => {
  // combine json into one data dictionary
  //const processedJson = combineCourses(jsonData);
  const BaseReq = convertToDict(jsonData.base_requirements);
  const NonBase = convertToDict(jsonData.non_base_exemptions);
  const UserDefined = convertToDict(jsonData.user_defined_courses);
  // Merge all dictionaries into one
  const CourseDict: CourseDict = {
    ...BaseReq,
    ...NonBase,
    ...UserDefined,
  };
  console.log("dict :", CourseDict);
  // using topological sort to process the data
  const sortedCourses = topologicalSort(CourseDict);
  console.log("sorted :", sortedCourses);
  const cleanSortedCourses = cleanCourses(sortedCourses);
  console.log("cleaned sorted coureses :", cleanSortedCourses);
  // schedule the data
  const suggestedSchedule = generateSchedule(cleanSortedCourses, 22, 12);
  console.log("schedule :", suggestedSchedule);
  // const schedule = scheduleCourse(sortedCourses, maxCredit, maxCoreCredit);

  jsonData.user_schedule = suggestedSchedule;
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
