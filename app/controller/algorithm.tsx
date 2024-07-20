/** @format */

// Credits to:
// Algorithm by Rohan "RJ" Jaiswal
// Adapted from chaudhary1337's solution on Leetcode 1494

interface Node {
  take_together: string[];
  code: string;
  name: string;
  credits: number;
  courseType: string;
  prerequisites: any;
  semestersOffered: number[];
  fulfillRequirements: string[];
}

interface Course {
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

type CourseDict = { [key: string]: Course };

export function convertToDict(nodes: Node[]): CourseDict {
  let result: CourseDict = {};
  for (let node of nodes) {
    // Extract course code and class number from the course code
    let [department, course] = node.code.split(/(\d+)/);

    // Transform the dependencies to fit the original function's structure
    let dependencies: string[][] = [];
    if (node.prerequisites && Array.isArray(node.prerequisites.or)) {
      dependencies = node.prerequisites.or.map((dep: any) => [dep]);
    }

    result[node.code] = {
      course,
      department,
      name: node.name,
      dependencies: dependencies,
      credits: node.credits,
      courseType: node.courseType,
      fulfillRequirements: node.fulfillRequirements,
      semestersOffered: node.semestersOffered,
      take_together: node.take_together,
    };
  }

  return result;
}

export function topologicalSort(data: CourseDict): string[] {
  const visited: { [key: string]: boolean } = {};
  const stack: string[] = [];

  // Create a list of visited nodes initialized to false
  for (let course in data) {
    visited[course] = false;
  }

  // Utility function for the depth-first traversal of the graph
  function dfs(node: string) {
    visited[node] = true;
    const dependencies = data[node].dependencies || [];

    const processDependencies = (deps: any) => {
      if (Array.isArray(deps)) {
        for (const dep of deps) {
          if (Array.isArray(dep)) {
            processDependencies(dep);
          } else if (typeof dep === "string" && !visited[dep]) {
            dfs(dep);
          }
        }
      } else if (typeof deps === "object") {
        if (deps.and) {
          processDependencies(deps.and);
        } else if (deps.or) {
          for (const orDep of deps.or) {
            if (!visited[orDep]) {
              dfs(orDep);
              break; // Only need one of the `or` conditions to be true
            }
          }
        }
      }
    };

    for (const depGroup of dependencies) {
      processDependencies(depGroup);
    }

    // As we backtrack from recursion, push nodes to stack
    stack.push(node);
  }

  // Go through all nodes and perform depth-first traversal
  for (let course in data) {
    if (!visited[course]) {
      dfs(course);
    }
  }

  return stack.reverse();
}

export function generateSchedule(
  json: CourseDict,
  maxCredit: number,
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
    courseJson: CourseDict,
  ) => {
    if (!Object.values(inDegrees).some((value) => value > 0)) return;

    const nodes = Object.fromEntries(
      Object.entries(graph).filter(
        ([course]) => visited[course] === 0 && (inDegrees[course] || 0) === 0,
      ),
    );

    const selected: { [key: string]: string[][] } = {};
    while (
      Object.keys(nodes).length > 0 &&
      creditSum(Object.keys(selected), courseJson) < creditMax
    ) {
      const course = Object.keys(nodes).pop()!;
      const dependencies = nodes[course];
      delete nodes[course];

      const proposedHours =
        creditSum(Object.keys(selected), courseJson) +
        courseJson[course].credits;
      if (proposedHours > creditMax) break;
      selected[course] = dependencies;
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
    recurse(graph, visited, inDegrees, creditMax, courseJson);
  };

  recurse(graph, visited, inDegrees, maxCredit, json);

  return schedule;
}
