/** @format */
// Credits to:
// Algorithm by Rohan "RJ" Jaiswal
// Adapted from chaudhary1337's solution on Leetcode 1494
import {
  PlanarDataType,
  PlannerCourseType,
  PlannerUserScheduleSemesterType,
  Prerequisites,
} from "@/types";
const inDegrees: { [key: string]: number } = {};
type CourseDict = { [key: string]: PlannerCourseType };

export function convertToDict(nodes: PlannerCourseType[]): CourseDict {
  let result: CourseDict = {};
  for (let node of nodes) {
    // Extract course code and class number from the course code
    let [department, course] = node.code.split(/(\d+)/);

    result[node.code] = {
      code: node.code,
      department,
      name: node.name,
      prerequisites: node.prerequisites,
      credits: node.credits,
      courseType: node.courseType,
      fulfillRequirements: node.fulfillRequirements,
      semestersOffered: node.semestersOffered,
      take_together: node.take_together,
      exempted: node.exempted,
      wildcard: node.wildcard,
      add_prerequisites: node.add_prerequisites,
    };
  }

  return result;
}

export function topologicalSort(courses: CourseDict) {
  let visited: { [key: string]: boolean } = {};
  let stack: PlannerCourseType[] = [];
  // let order = {};

  // Create a list of visited nodes initialized to false
  for (let course in courses) {
    visited[course] = false;
  }

  // Utility function for the depth-first traversal of the graph
  function dfs(node: string) {
    visited[node] = true;

    let dependencies;
    try {
      dependencies = courses[node].prerequisites;
    } catch (error) {
      console.log("Error for node: " + node);
    }
    //method
    const processDependencies = (deps: any) => {
      if (typeof deps == "string") {
        if (!visited[deps]) {
          dfs(deps);
        }
      } else if (Array.isArray(deps)) {
        // process array
        deps.forEach(processDependencies);
      } else if (deps != null && typeof deps == "object") {
        // handle "and" and "or" logical conditions
        if (deps.and) {
          deps.and.forEach(processDependencies);
        }
        if (deps.or) {
          //process first univisted course in or list
          for (const orDep of deps.or) {
            if (!visited[orDep]) {
              dfs(orDep);
              break;
            }
          }
        }
      }
    };

    if (dependencies && !courses[node].exempted) {
      processDependencies(dependencies);
    }

    // As we backtrack from recursion, push nodes to stack
    stack.push(courses[node]);
  }

  // Go through all nodes and perform depth-first traversal
  for (let course in courses) {
    if (!visited[course]) {
      dfs(course);
    }
  }

  // Reverse the stack to get the correct order of courses
  console.log("Final topological order:", stack);

  return stack; //return an object
}

const processPrerequisites = (prereqs: Prerequisites | undefined): string[] => {
  let results: string[] = [];

  if (prereqs?.or) {
    // Map 'or' prerequisites and wrap each prerequisite in brackets to indicate a choice
    let orResults = prereqs.or.map((dep) =>
      typeof dep === "string"
        ? `[${dep}]`
        : processPrerequisites(dep).join(", "),
    );
    results.push(...orResults);
  }

  if (prereqs?.and) {
    // Map 'and' prerequisites and concatenate directly since all are required
    let andResults = prereqs.and.map((dep) =>
      typeof dep === "string" ? dep : processPrerequisites(dep).join(", "),
    );
    if (andResults.length > 0) {
      results.push(andResults.join(","));
    }
  }

  // Correctly handle cleaning up the results to remove leading commas or spaces
  return results.map((r) => {
    // Check for leading commas and remove them specifically, preserving all other content
    return r.replace(/^,\s*/, "");
  });
};

export function generateSchedule(
  planData: PlannerCourseType[],
  maxCredit: number,
  maxCsCredit: number,
): PlannerUserScheduleSemesterType[] {
  const graph: { [key: string]: string[] } = {};
  const inDegrees: { [key: string]: number } = {};
  const visited: { [key: string]: boolean } = {};
  const schedule: PlannerUserScheduleSemesterType[] = [];

  // Initialize Semester 0 for exempted courses
  const semesterZero: string[] = [];

  // Build graph and inDegrees
  planData.forEach((course) => {
    if (course.exempted) {
      semesterZero.push(course.code);
      visited[course.code] = true; // Mark exempted courses as visited
    } else {
      graph[course.code] = [];
      visited[course.code] = false;

      if (course.prerequisites) {
        console.log("code :", course.code);
        const prerequisites = processPrerequisites(course.prerequisites); // Ensure this returns string[]

        console.log("prerequisites :", prerequisites);
        graph[course.code] = prerequisites;
        prerequisites.forEach((prereq) => {
          inDegrees[prereq] = (inDegrees[prereq] || 0) + 1;
        });
      }
    }
  });

  // Add exempted courses to schedule as Semester 0
  if (semesterZero.length > 0) {
    schedule.push({
      order: -1,
      name: "Exempted",
      courses: semesterZero,
      mark_complete: true, // Assuming exempted courses are completed
    });
  }

  const canSchedule = (courseCode: string) => {
    return !visited[courseCode] && (inDegrees[courseCode] || 0) === 0;
  };

  // Function to recursively fill the schedule
  const recurse = (semesterIndex: number) => {
    const semester: string[] = [];
    let semesterCredits = 0;
    let semesterCsCredits = 0;

    for (const courseCode of Object.keys(graph)) {
      if (canSchedule(courseCode)) {
        const course = planData.find((c) => c.code === courseCode)!;
        const newSemesterCredits = semesterCredits + course.credits;
        const newSemesterCsCredits =
          semesterCsCredits +
          (course.courseType === "Core Foundation" ? course.credits : 0);

        if (
          newSemesterCredits <= maxCredit &&
          newSemesterCsCredits <= maxCsCredit
        ) {
          semester.push(courseCode);
          semesterCredits = newSemesterCredits;
          semesterCsCredits = newSemesterCsCredits;
          visited[courseCode] = true;
          graph[courseCode].forEach((prereq) => inDegrees[prereq]--);
        }
      }
    }

    if (semester.length > 0) {
      schedule.push({
        order: semesterIndex + 1, // Adjust order to account for Semester 0
        name: `Semester ${semesterIndex + 1}`,
        courses: semester,
        mark_complete: false,
      });
      recurse(semesterIndex + 1);
    }
  };

  // Start recursion from Semester 1 if there are exempted courses
  recurse(0);
  return schedule;
}
