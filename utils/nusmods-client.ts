import axios from "axios";

export const retrieveSpecificMods = async (cohort: string, courseCode: string,wildcard: boolean) => {

    if (wildcard == true || courseCode.startsWith("EX")){
    // Handle the case where wildcard is true
    return {
        // Return a default or empty object, or handle it according to your requirements
        prereqTree: null,
        semesterData: [],
        fulfillRequirements: [],
    };
    } else {
        const response = await axios.get(
            `https://api.nusmods.com/v2/${cohort}/modules/${courseCode}.json`,
        );
        return response.data;
         
    }
    
}