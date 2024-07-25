/** @format */
// Credits to:
// Algorithm by Rohan "RJ" Jaiswal
// Adapted from chaudhary1337's solution on Leetcode 1494
import { PlannerCourseType } from "@/types";

type CourseDict = { [key: string]: PlannerCourseType };

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
      console.log(
        "Loading prereq for :",
        courses[node].code,
        " => ",
        dependencies,
      );
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
  return stack.reverse;
}

export function generateSchedule(
  json: CourseDict,
  maxCredit: number,
  maxCsCredit: number, // Add a parameter for max CS credits
): string[][] {
  const graph: { [key: string]: string[][] } = {};
  const visited: { [key: string]: number } = {};
  const schedule: string[][] = [];

  for (const [courseName, courseData] of Object.entries(json)) {
    const dependencies = courseData.dependencies || [];
    graph[courseName] = dependencies;
    visited[courseName] = 0;
  }

  const creditSum = (nodes: string[], courseJson: CourseDict): number => {
    return nodes.reduce((acc, course) => acc + courseJson[course].credits, 0);
  };

  const csCreditSum = (nodes: string[], courseJson: CourseDict): number => {
    return nodes.reduce((acc, course) => {
      return courseJson[course].department === "CS"
        ? acc + courseJson[course].credits
        : acc;
    }, 0);
  };

  const inDegrees: { [key: string]: number } = {};
  for (const [course, dependencies] of Object.entries(graph)) {
    for (const row of dependencies) {
      for (const prereq of row) {
        inDegrees[prereq] = (inDegrees[prereq] || 0) + 1;
      }
    }
  }

  const recurse = (
    graph: { [key: string]: string[][] },
    visited: { [key: string]: number },
    inDegrees: { [key: string]: number },
    creditMax: number,
    csCreditMax: number,
    courseJson: CourseDict,
  ) => {
    if (!Object.values(inDegrees).some((value) => value > 0)) return;

    const nodes = Object.fromEntries(
      Object.entries(graph).filter(
        ([course]) => visited[course] === 0 && (inDegrees[course] || 0) === 0,
      ),
    );

    const selected: { [key: string]: string[][] } = {};

    const selectCourses = (maxCsReached: boolean) => {
      while (Object.keys(nodes).length > 0) {
        const course = Object.keys(nodes).pop()!;
        const dependencies = nodes[course];
        delete nodes[course];

        const proposedHours =
          creditSum(Object.keys(selected), courseJson) +
          courseJson[course].credits;
        const proposedCsHours =
          csCreditSum(Object.keys(selected), courseJson) +
          (courseJson[course].department === "CS"
            ? courseJson[course].credits
            : 0);

        if (proposedHours > creditMax) break;
        if (!maxCsReached && proposedCsHours > csCreditMax) continue;
        if (maxCsReached && courseJson[course].department === "CS") continue;

        selected[course] = dependencies;
        if (proposedHours >= creditMax) break;
      }
    };

    selectCourses(false); // First pass: select courses, respecting CS credit limit

    if (creditSum(Object.keys(selected), courseJson) < creditMax) {
      selectCourses(true); // Second pass: select non-CS courses if there is still room
    }

    const semester: string[] = [];
    for (const [course, dependencies] of Object.entries(selected)) {
      semester.push(course);
      visited[course] = 1;
      for (const row of dependencies) {
        for (const dep of row) {
          inDegrees[dep] -= 1;
        }
      }
    }
    schedule.unshift(semester);
    recurse(graph, visited, inDegrees, creditMax, csCreditMax, courseJson);
  };

  recurse(graph, visited, inDegrees, maxCredit, maxCsCredit, json);

  return schedule;
}
