import axios from "axios";

export const retrieveSpecificMods = async (cohort: string, courseCode: string) => {
    const response = await axios.get(
        `https://api.nusmods.com/v2/${cohort}/modules/${courseCode}.json`,
    );

    return response.data;
}