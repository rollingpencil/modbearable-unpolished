import axios from "axios";

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
  code: string;
  name: string;
  credits: number;
  courseType: string;
  prerequisites: any;
  semestersOffered: number[];
  fulfillRequirements: string[];
  //taketogether: string[];
}
// Helper function to perform topological sort
function topologicalSort(
  courses: OutputCourse[],
  courseMap: Record<string, OutputCourse>,
) {
  //TODO: topo sort helper

  return [];
}

const fetchAndFilterPrerequisites = async (
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
    const semestersOffered = response.data.semesterData.map(
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
          course.code,
          jsonData.base_requirements,
          jsonData.cohort,
        );

        // Handle manual prerequisites
        const manualPrerequisites = course.add_prerequisites.filter(
          (prereqCode) => courseMap[prereqCode],
        );

        if (manualPrerequisites.length === 0) {
          //console.log(prerequisitesInfo.prerequisites);
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
    const filteredCourses = studyPlan.map(
      ({ exempted, wildcard, add_prerequisites, ...course }) => course,
    );
    const planner = (courses: OutputCourse[]): OutputCourse[][] => {
      // TODO: Implement actual planning logic
      return [courses];
    };

    const study_schedule = planner(filteredCourses);
    //console.log("schedule");
    console.log(study_schedule);
    //console.log("end");

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
