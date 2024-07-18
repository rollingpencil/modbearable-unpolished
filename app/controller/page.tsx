"use client";

import React, { useEffect, useState } from "react";
import { processJsonData, JSONData, Course } from "./engine";

const StudyPlanComponent: React.FC = () => {
  const [studyPlan, setStudyPlan] = useState<any[]>([]);

  useEffect(() => {
    const fetchStudyPlan = async () => {
      try {
        const response = await fetch("/input.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData: JSONData = await response.json();

        const plan = await processJsonData(jsonData);
        setStudyPlan(plan);
      } catch (error) {
        console.error("Error fetching study plan:", error);
      }
    };

    fetchStudyPlan();
  }, []);

  return (
    <div>
      <h1>Study Plan</h1>
      {studyPlan.map((semester, index) => (
        <div key={index}>
          <h2>Semester {index + 1}</h2>
          <ul>
            {semester.map((course: any) => (
              <li key={course.code}>
                {course.code} - {course.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default StudyPlanComponent;
