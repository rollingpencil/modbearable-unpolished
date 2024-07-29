export const retrieveSpecificMods = async (
  cohort: string,
  courseCode: string,
  wildcard: boolean,
) => {
  let baseResponse = {
    // Return a default or empty object, or handle it according to your requirements
    prereqTree: null,
    semesterData: [],
    fulfillRequirements: [],
  };

  if (wildcard == false && !courseCode.startsWith("EX")) {
    await fetch(
      `https://api.nusmods.com/v2/${cohort}/modules/${courseCode}.json`,
    )
      .then((res) => res.json())
      .then((data) => {
        baseResponse = data;
      });
  }

  return baseResponse;
};

export const searchModules = async (cohort: string, query: string) => {
    const response = await fetch(`https://api.nusmods.com/v2/${cohort}/moduleList.json`);
    const modules = await response.json();
    return modules.filter((mod: any) => mod.moduleCode.includes(query.toUpperCase()));
  };
  