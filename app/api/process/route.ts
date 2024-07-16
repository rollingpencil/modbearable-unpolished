import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

interface Course {
  code: string;
  name: string;
  credits: number;
  exempted: boolean;
  courseType: string;
  add_prerequisites: string[];
  take_together: string[];
}

interface JSONData {
  base_requirements: Course[];
  cohort: string;
}

const fetchAndFilterPrerequisites = async (courseCode: string, courses: Course[], cohort: string) => {
  try {
    const response = await axios.get(`https://api.nusmods.com/v2/${cohort}/modules/${courseCode}.json`);
    const prereqTree = response.data.prereqTree || {};

    const courseCodes = courses.reduce((acc, course) => {
      if (!course.exempted) acc[course.code] = true;  // Only include non-exempted courses
      return acc;
    }, {} as Record<string, boolean>);

    const filterPrerequisites = (prereq: any): any => {
      if (typeof prereq === 'string') {
        const courseCode = prereq.split(':')[0];
        return courseCodes[courseCode] ? courseCode : null;
      } else if (prereq.and) {
        return { and: prereq.and.map(filterPrerequisites).filter(Boolean) };
      } else if (prereq.or) {
        return { or: prereq.or.map(filterPrerequisites).filter(Boolean) };
      }
      return null;
    };

    const filteredPrereqTree = filterPrerequisites(prereqTree);
    const semestersOffered = response.data.semesterData.map((sem: { semester: any; }) => sem.semester);

    return {
      prerequisites: filteredPrereqTree,
      semestersOffered,
      fulfillRequirements: response.data.fulfillRequirements || []
    };
  } catch (error) {
    console.error(`Error fetching prerequisites for ${courseCode}:`, error instanceof Error ? error.message : error);
    return {
      prerequisites: "Error fetching prerequisites",
      semestersOffered: [],
      fulfillRequirements: []
    };
  }
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.join(process.cwd(), 'input.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    const jsonData: JSONData = JSON.parse(fileData);

    const nonExemptCourses = jsonData.base_requirements.filter(course => !course.exempted);
    const courseMap = nonExemptCourses.reduce((map, course) => {
      map[course.code] = course;
      return map;
    }, {} as Record<string, Course>);

    // Ensure bidirectional take_together relationships
    nonExemptCourses.forEach(course => {
      course.take_together.forEach(code => {
        if (courseMap[code] && !courseMap[code].take_together.includes(course.code)) {
          courseMap[code].take_together.push(course.code);
        }
      });
    });

    const studyPlan = await Promise.all(nonExemptCourses.map(async (course) => {
      const prerequisitesInfo = await fetchAndFilterPrerequisites(
        course.code,
        jsonData.base_requirements,
        jsonData.cohort
      );

      return {
        ...course,
        prerequisites: prerequisitesInfo.prerequisites,
        semestersOffered: prerequisitesInfo.semestersOffered,
        fulfillRequirements: prerequisitesInfo.fulfillRequirements
      };
    }));

    return NextResponse.json(studyPlan);
  } catch (error) {
    console.error('Error processing JSON file:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Error processing JSON file' });
  }
}
