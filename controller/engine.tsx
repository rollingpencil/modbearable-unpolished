import { retrieveSpecificMods } from "@/utils/nusmods-client";
import {
  PlannerCourseType,
  PlanarDataType,
  RetrieveSpecificModsType,
} from "@/types/";

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

export const processJsonData = async (
  jsonData: PlanarDataType,
  setData: Function,
  setStatus: Function,
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
    setStatus(true);
  } catch (error) {
    console.error(
      "Error processing JSON data:",
      error instanceof Error ? error.message : error,
    );
  }
};

export const processJsonDataSimple = async (
  data: PlanarDataType,
  setData: Function,
  setStatus: Function,
) => {
  console.log("Populating Prerequisite Data Tree");

  const newBR: PlannerCourseType[] = await Promise.all(
    data.base_requirements.map(async (c) => {
      const {
        prereqTree,
        semesterData,
        fulfillRequirements,
      }: RetrieveSpecificModsType = await retrieveSpecificMods(
        data.cohort,
        c.code,
        c.wildcard,
      );

      c.prerequisites = prereqTree;
      if (prereqTree == null && c.add_prerequisites.length > 0) {
        c.prerequisites = { or: c.add_prerequisites.map((ap) => `${ap}:D`) };
      }
      c.semestersOffered = semesterData.map((so) => so.semester);
      c.fulfillRequirements = fulfillRequirements;

      return c;
    }),
  );

  const newNBE: PlannerCourseType[] = await Promise.all(
    data.non_base_exemptions.map(async (c) => {
      const {
        prereqTree,
        semesterData,
        fulfillRequirements,
      }: RetrieveSpecificModsType = await retrieveSpecificMods(
        data.cohort,
        c.code,
        c.wildcard,
      );

      c.prerequisites = prereqTree;
      if (prereqTree == null && c.add_prerequisites.length > 0) {
        c.prerequisites = { or: c.add_prerequisites.map((ap) => `${ap}:D`) };
      }
      c.semestersOffered = semesterData.map((so) => so.semester);
      c.fulfillRequirements = fulfillRequirements;

      return c;
    }),
  );

  const newUDC: PlannerCourseType[] = await Promise.all(
    data.user_defined_courses.map(async (c) => {
      const {
        prereqTree,
        semesterData,
        fulfillRequirements,
      }: RetrieveSpecificModsType = await retrieveSpecificMods(
        data.cohort,
        c.code,
        c.wildcard,
      );

      c.prerequisites = prereqTree;
      if (prereqTree == null && c.add_prerequisites.length > 0) {
        c.prerequisites = { or: c.add_prerequisites.map((ap) => `${ap}:D`) };
      }
      c.semestersOffered = semesterData.map((so) => so.semester);
      c.fulfillRequirements = fulfillRequirements;

      return c;
    }),
  );

  setData({
    ...data,
    base_requirements: newBR,
    non_base_exemptions: newNBE,
    user_defined_courses: newUDC,
  });
  setStatus(true);
};

export const scheduleCourse = async (
  data: PlanarDataType | null,
  setData: Function,
) => {
  const masterCourseList = [
    ...data!.base_requirements,
    ...data!.non_base_exemptions,
    ...data!.user_defined_courses,
  ];
};
export const dependencyCheck = async (
  data: PlanarDataType | null,
  courseHashmap: Map<string, PlannerCourseType> | null,
  setCourseError: Function,
) => {
  if (data != null && courseHashmap != null) {
    if (data.user_schedule.length < 1) {
      //Schedule is either empty or only contains exemptions
      return;
    }

    let limitedHashmap = new Map<string, PlannerCourseType>();

    let errorLog = new Map<string, string[]>();

    for (let i = 1; i < data.user_schedule.length; i++) {
      const lastSem = data.user_schedule[i - 1];

      for (const semCourseCode of lastSem.courses) {
        limitedHashmap.set(semCourseCode, courseHashmap.get(semCourseCode)!);
      }

      const currentSem = data.user_schedule[i];

      for (const semCourseCode of currentSem.courses) {
        processPrereq(
          limitedHashmap,
          semCourseCode,
          courseHashmap.get(semCourseCode)!.prerequisites,
          false,
          errorLog,
        );
      }
    }
    setCourseError(errorLog);
  }
};

const processPrereq = (
  hashmap: Map<string, PlannerCourseType>,
  currNode: string,
  childTree: any,
  subfulfillment: boolean,
  errorLog: Map<string, string[]>,
): boolean => {
  console.log(currNode, childTree);
  if (childTree != null) {
    if (typeof childTree == "string") {
      childTree = { or: [childTree] };
    }

    if ("and" in childTree) {
      console.log("and node");
      let fulfilled: boolean = true;

      childTree.and.forEach((child: any) => {
        fulfilled =
          processPrereq(hashmap, currNode, child, subfulfillment, errorLog) &&
          fulfilled;
      });

      return fulfilled;
    }

    if ("or" in childTree) {
      console.log("or node");

      if (childTree.or.length == 0) {
        return true;
      }

      let fulfilled = false;

      for (let i = 0; i < childTree.or.length; i++) {
        let item = childTree.or[i];

        if (typeof item == "string") {
          const code = item.slice(0, -2);

          if (hashmap.has(code)) {
            // Found dependency
            console.log(`${currNode}: Found ${code}`);
            fulfilled = true;
          }
        } else {
          // nOf case
          const subModList = item.nOf[1];

          const formattedSubModList = subModList.map((submod: string) => ({
            or: [submod],
          }));
          const furtherChildTree = { and: formattedSubModList };

          fulfilled =
            fulfilled ||
            processPrereq(hashmap, currNode, furtherChildTree, true, errorLog);
        }
      }

      if (fulfilled == false && subfulfillment == false) {
        let errorString = "Missing/Wrong Order: ";

        for (let i = 0; i < childTree.or.length; i++) {
          let item = childTree.or[i];

          if (typeof item == "string") {
            errorString = errorString.concat(item.slice(0, -2));
          } else {
            const subModList = item.nOf[1].map((submod: string) =>
              submod.slice(0, -2),
            );

            errorString = errorString.concat(`[${subModList.toString()}]`);
          }
          if (i < childTree.or.length - 1) {
            errorString = errorString.concat("/");
          }
        }
        if (errorLog.has(currNode)) {
          errorLog.set(currNode, errorLog.get(currNode)!.concat(currNode));
        } else {
          errorLog.set(currNode, [errorString]);
        }
      }

      return fulfilled;
    }

    return false;
  }

  return true;
};
