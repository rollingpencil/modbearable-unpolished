import axios from "axios";
import { convertToDict, generateSchedule, topologicalSort } from "./algorithm";
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
  cohort: string;
}

interface OutputCourse {
  take_together: string[];
  code: string;
  name: string;
  credits: number;
  courseType: string;
  prerequisites: any;
  semestersOffered: number[];
  fulfillRequirements: string[];
}

interface Courses {
  course: string;
  department: string;
  name: string;
  dependencies: string[][];
  credits: number;
  courseType: string;
  fulfillRequirements: string[];
  semestersOffered: number[];
  take_together: string[];
}

type CourseDicts = { [key: string]: Courses };

const fetchAndFilterPrerequisites = async (
  wildcard: boolean,
  courseCode: string,
  courses: Course[],
  cohort: string,
) => {
  try {
    const response = await axios.get(
      `https://api.nusmods.com/v2/${cohort}/modules/${courseCode}.json`,
    );
    const prereqTree = response.data.prereqTree || {};

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
    let semestersOffered = null;

    semestersOffered = response.data.semesterData.map(
      (sem: { semester: any }) => sem.semester,
    );

    return {
      prerequisites: filteredPrereqTree,
      semestersOffered,
      fulfillRequirements: response.data.fulfillRequirements || [],
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

const processJsonData = async (jsonData: JSONData) => {
  try {
    const nonExemptCourses = jsonData.base_requirements.filter(
      (course) => !course.exempted,
    );
    const courseMap = nonExemptCourses.reduce(
      (map, course) => {
        map[course.code] = course;
        return map;
      },
      {} as Record<string, Course>,
    );
    // Ensure bidirectional take_together relationships
    nonExemptCourses.forEach((course) => {
      course.take_together.forEach((code) => {
        if (
          courseMap[code] &&
          !courseMap[code].take_together.includes(course.code)
        ) {
          courseMap[code].take_together.push(course.code);
        }
      });
    });

    const studyPlan = await Promise.all(
      nonExemptCourses.map(async (course) => {
        const prerequisitesInfo = await fetchAndFilterPrerequisites(
          course.wildcard,
          course.code,
          jsonData.base_requirements,
          jsonData.cohort,
        );

        // Handle manual prerequisites
        const manualPrerequisites = course.add_prerequisites.filter(
          (prereqCode) => courseMap[prereqCode],
        );

        if (manualPrerequisites.length === 0) {
          return {
            ...course,
            prerequisites: {
              ...prerequisitesInfo.prerequisites,
            },
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
      }),
    );

    const planner = (courses: OutputCourse[]): OutputCourse[][] => {
      //TODO: TOPO SORT
      const filteredCourses = studyPlan.map(
        ({ exempted, wildcard, add_prerequisites, ...course }) => course,
      );

      const courseDict: CourseDicts = convertToDict(filteredCourses);

      // Perform topological sort
      const sortedCourses = topologicalSort(courseDict);
      console.log("Topologically sorted courses:", sortedCourses);

      // Generate schedule
      const maxCredit = 20;
      const schedule = generateSchedule(courseDict, maxCredit);
      console.log("Generated schedule:", schedule);
      return [courses];
    };
    const study_schedule = planner(studyPlan);

    return study_schedule;
  } catch (error) {
    console.error(
      "Error processing JSON data:",
      error instanceof Error ? error.message : error,
    );
    return [];
  }
};

export { processJsonData };
export type { JSONData, Course };
