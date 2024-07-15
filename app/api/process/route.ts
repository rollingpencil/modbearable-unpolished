import { NextResponse } from "next/server";
import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'path';

type PrereqTree = {
  and?: (string | PrereqTree)[];
  or?: (string | PrereqTree)[];
};

const fetchAndFilterPrerequisites = async (courseCode: string, exemptedCourses: string[], cohort: string) => {
  try {
    const response = await axios.get(`https://api.nusmods.com/v2/${cohort}/modules/${courseCode}.json`);
    const prereqTree = response.data.prereqTree || "No prerequisites";
    const semesterData = response.data.semesterData || [];
    const fulfillRequirements = response.data.fulfillRequirements || [];

    const filterPrerequisites = (prereq: any): string | PrereqTree | null => {
      if (typeof prereq === 'string') {
        const code = prereq.split(':')[0];
        return !exemptedCourses.includes(code) ? code : null;
      } else if (prereq.and) {
        const filteredAnd = prereq.and.map(filterPrerequisites).filter(Boolean) as (string | PrereqTree)[];
        return filteredAnd.length ? { and: filteredAnd } : null;
      } else if (prereq.or) {
        const filteredOr = prereq.or.map(filterPrerequisites).filter(Boolean) as (string | PrereqTree)[];
        return filteredOr.length ? { or: filteredOr } : null;
      }
      return null;
    };

    const filteredPrereqTree = filterPrerequisites(prereqTree);
    const semestersOffered = semesterData.map((sem: any) => sem.semester);

    return {
      prerequisites: filteredPrereqTree || [],
      semestersOffered,
      fulfillRequirements
    };
  } catch (error) {
    console.error(`Error fetching prerequisites for ${courseCode}:`, error.message);
    return {
      prerequisites: "Error fetching prerequisites",
      semestersOffered: [],
      fulfillRequirements: []
    };
  }
};

const processJsonFile = async (jsonFilePath: string, fetchedJson: any) => {
  try {
    //const data = await fs.readFile(jsonFilePath, 'utf8');
    const data = await fs.readFile(process.cwd() + '/input.json', 'utf8');
    //console.log(data);
    const parsedData = JSON.parse(data);

    const exemptedCourses = parsedData.base_requirements
      .filter((course: any) => course.exempted)
      .map((course: any) => course.course);
    // continue from here
    let studyPlan = fetchedJson.filter((course: any) => !exemptedCourses.includes(course.code));

    const updatedPrereqs = (prereq: any): string | PrereqTree | null => {
      if (typeof prereq === 'string') {
        const code = prereq.split(':')[0];
        if (exemptedCourses.includes(code)) {
          return null;
        }
        return prereq;
      } else if (prereq.and) {
        const filteredAnd = prereq.and.map(updatedPrereqs).filter(Boolean) as (string | PrereqTree)[];
        return filteredAnd.length ? { and: filteredAnd } : null;
      } else if (prereq.or) {
        const filteredOr = prereq.or.map(updatedPrereqs).filter(Boolean) as (string | PrereqTree)[];
        return filteredOr.length ? { or: filteredOr } : null;
      }
      return null;
    };

    studyPlan = studyPlan.map((course: any) => {
      course.prerequisites = updatedPrereqs(course.prerequisites) || [];
      return course;
    });

    for (const req of parsedData.base_requirements) {
      if (req.exempted || req.wildcard) continue;

      const existingCourse = studyPlan.find((course: any) => course.code === req.course);
      if (existingCourse) {
        existingCourse.name = req.name;
        existingCourse.credits = req.credits;

        if (!Array.isArray(existingCourse.prerequisites)) {
          existingCourse.prerequisites = existingCourse.prerequisites !== "No prerequisites" ? [existingCourse.prerequisites] : [];
        }

        req.add_prerequisites.forEach((prereq: any) => {
          if (!exemptedCourses.includes(prereq) && !existingCourse.prerequisites.includes(prereq)) {
            existingCourse.prerequisites.push(prereq);
          }
        });

        if (req.take_together.length > 0) {
          existingCourse.take_together = req.take_together;
        }
      } else {
        try {
          const { prerequisites, semestersOffered, fulfillRequirements } = await fetchAndFilterPrerequisites(req.course, exemptedCourses, parsedData.cohort);

          let updatedPrerequisites = prerequisites;
          if (!Array.isArray(updatedPrerequisites)) {
            updatedPrerequisites = updatedPrerequisites !== "No prerequisites" ? [updatedPrerequisites] : [];
          }

          req.add_prerequisites.forEach((prereq: any) => {
            if (!exemptedCourses.includes(prereq) && !updatedPrerequisites.includes(prereq)) {
              updatedPrerequisites.push(prereq);
            }
          });

          studyPlan.push({
            code: req.course,
            name: req.name,
            credits: req.credits,
            prerequisites: updatedPrerequisites.length > 0 ? updatedPrerequisites : [],
            semestersOffered: semestersOffered || [],
            fulfillRequirements: fulfillRequirements || [],
            process: true,
            take_together: req.take_together
          });
        } catch (error) {
          studyPlan.push({
            code: req.course,
            name: req.name,
            credits: req.credits,
            prerequisites: [],
            semestersOffered: [],
            fulfillRequirements: [],
            process: true,
            take_together: req.take_together
          });
        }
      }
    }

    studyPlan.forEach((course: any) => {
      if (course.take_together && course.take_together.length > 0) {
        course.take_together.forEach((togetherCourseCode: any) => {
          const togetherCourse = studyPlan.find((c: any) => c.code === togetherCourseCode);
          if (togetherCourse && !togetherCourse.take_together.includes(course.code)) {
            togetherCourse.take_together.push(course.code);
          }
        });
      }
    });

    return studyPlan;
  } catch (error) {
    console.error('Error processing JSON file:', error.message);
    return [];
  }
};

export async function GET(request: Request) {
  console.log("Called /api/process/route.ts");

  
    const file = await fs.readFile(process.cwd() + '/input.json', 'utf8');
    //console.log(file);
    const parsedData = JSON.parse(file);
    //console.log(parsedData.cohort);
    const response = await axios.get(`https://api.nusmods.com/v2/${parsedData.cohort}/moduleList.json`);
    const fetchedJson = response.data;
    //console.log(fetchedJson);
    //fix this 
    const studyPlan = await processJsonFile(file, fetchedJson);

    //const filePath = path.join(process.cwd(), 'updated_study_plan.json');
    //await fs.writeFile(filePath, JSON.stringify(studyPlan, null, 2));

    return NextResponse.json({ status: 200 });
  
}
