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
import TinyQueue from "tinyqueue";
type InDegreeDict = { [key: string]: number };
type VisitedDict = { [key: string]: boolean };

export function convertToDict(nodes: PlannerCourseType[]): CourseDict {
  let result: CourseDict = {};
  for (let node of nodes) {
    // Extract course code and class number from the course code
    let [department, course] = node.code.split(/(\d+)/);

    result[node.code] = {
      code: node.code,
      department,
      name: node.name,
      dependencies: undefined,
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

  return stack.reverse(); //return an object
}
function processPrerequisites(prereqs: any): string[] {
  let results: string[] = [];

  if (typeof prereqs === "string") {
    // Splitting by comma to handle combined course codes
    results = prereqs.split(",").map((code) => code.trim());
  } else if (Array.isArray(prereqs)) {
    prereqs.forEach((dep) => {
      results.push(...processPrerequisites(dep));
    });
  } else if (prereqs && typeof prereqs === "object") {
    if (prereqs.and) {
      // Flatten and merge results for AND conditions
      results = prereqs.and.flatMap((dep) => processPrerequisites(dep));
    }
    if (prereqs.or) {
      // Handle OR conditions similarly
      prereqs.or.forEach((dep) => {
        results.push(...processPrerequisites(dep));
      });
    }
  }

  return results;
}
export function generateSchedule(
  planData: PlannerCourseType[],
  maxCredit: number,
  maxCsCredit: number,
): PlannerUserScheduleSemesterType[] {
  const graph: { [key: string]: string[] } = {};
  const inDegrees: { [key: string]: number } = {};
  const visited: { [key: string]: boolean } = {};
  const schedule: PlannerUserScheduleSemesterType[] = [];
  const semesterZero: string[] = [];
  const priorityQueue = new TinyQueue<string>(
    [],
    (a, b) => inDegrees[a] - inDegrees[b],
  );

  planData.forEach((course) => {
    if (course.exempted) {
      semesterZero.push(course.code);
      visited[course.code] = true; // Mark exempted courses as visited
    } else {
      graph[course.code] = [];
      visited[course.code] = false;
      if (course.prerequisites) {
        const prerequisites = processPrerequisites(course.prerequisites);
        graph[course.code] = prerequisites;
        prerequisites.forEach((prereq) => {
          inDegrees[prereq] = (inDegrees[prereq] || 0) + 1;
        });
      }
    }
  });

  // Populate priority queue with schedulable courses
  Object.keys(graph).forEach((course) => {
    if (
      !visited[course] &&
      (inDegrees[course] === 0 || inDegrees[course] === undefined)
    ) {
      priorityQueue.push(course);
    }
  });
  // Schedule exempted courses
  if (semesterZero.length > 0) {
    schedule.push({
      order: -1,
      name: "Exempted",
      courses: semesterZero,
      mark_complete: true,
    });
  }
  //console.log("PQ :", priorityQueue.data);

  // Begin scheduling process
  let semesterIndex = 0;
  while (priorityQueue.length > 0) {
    const semester: string[] = [];
    let semesterCredits = 0;
    let semesterCsCredits = 0;

    while (priorityQueue.length > 0) {
      const semester: string[] = [];
      let semesterCredits = 0;
      let semesterCsCredits = 0;

      let attempts = priorityQueue.length; // Prevent infinite loops
      while (attempts-- > 0 && semesterCredits < maxCredit) {
        const courseCode = priorityQueue.pop();

        if (!visited[courseCode]) {
          const course = planData.find((c) => c.code === courseCode);
          console.log("couse :", course);
          if (!course) {
            console.error("Course not found for code:", courseCode);
            continue; // Skip this iteration if course is not found
          }
          const newSemesterCredits = semesterCredits + course.credits;
          const newSemesterCsCredits =
            semesterCsCredits +
            (course.department === "CS" ? course.credits : 0);

          if (
            newSemesterCredits <= maxCredit &&
            newSemesterCsCredits <= maxCsCredit
          ) {
            semester.push(courseCode);
            semesterCredits = newSemesterCredits;
            semesterCsCredits = newSemesterCsCredits;
            visited[courseCode] = true;
            graph[courseCode].forEach((prereq) => {
              inDegrees[prereq]--;
              if (inDegrees[prereq] === 0 && !visited[prereq]) {
                priorityQueue.push(prereq);
              }
            });
          } else {
            // Re-add the course at the end of the queue to try again later
            priorityQueue.push(courseCode);
          }
        }
      }
      console.log(
        `Semester ${semesterIndex + 1} scheduled with courses:`,
        semester,
      );
      console.log(`Remaining inDegrees:`, JSON.stringify(inDegrees, null, 2));
      console.log(`Remaining Courses in Queue:`, priorityQueue.length);

      if (semester.length > 0) {
        schedule.push({
          order: semesterIndex + 1,
          name: `Semester ${semesterIndex + 1}`,
          courses: semester,
          mark_complete: false,
        });
        semesterIndex++;
      }
    }
  }

  return schedule;
}
