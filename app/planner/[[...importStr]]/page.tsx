"use client";

import { useEffect, useState } from "react";

import { processJsonData, scheduleCourse } from "@/controller/engine";
import { title } from "@/components/primitives";
import { SemesterCard } from "@/components/planner/semesterCard";
import { PlanarDataType, PlannerCourseType } from "@/types";

export default function PlannerPage({
  params,
}: {
  params: { importStr: string };
}) {
  const [status, setStatus] = useState(false);
  const [data, setData] = useState<PlanarDataType | null>(null);
  const [schedule, setSchedule] = useState(false);
  const [courseHashmap, setCourseHashmap] = useState<Map<
    string,
    PlannerCourseType
  > | null>(null);

  useEffect(() => {
    if (data == null) {
      if ("importStr" in params) {
        console.log(`From URL | ${params.importStr[0]}`);
        const importString = params.importStr[0];
        const importStringDecoded = decodeURIComponent(importString);

        setData(JSON.parse(atob(importStringDecoded)));
      } else {
        // localStorage.getItem("data", btoa(JSON.stringify(data)));
        let localStorageData = localStorage.getItem("data");

        if (localStorageData == null) {
          localStorageData = "";
        }
        console.log(`From localStorage | ${localStorageData}`);
        setData(JSON.parse(atob(localStorageData)));
      }
    }
  }, [data]);
  useEffect(() => {
    if (data != null) {
      let masterCourseList = data.base_requirements.concat(
        data.non_base_exemptions,
        data.user_defined_courses,
      );
      let masterCourseHashmap = new Map(
        masterCourseList.map((c) => [c.code, c]),
      );

      setCourseHashmap(masterCourseHashmap);
    }
  }, [data]);
  const handleValidate = (event: any) => {};
  const handleSchedule = (event: any) => {};

  useEffect(() => {
    const processData = async () => {
      if (data != null && !status) {
        await processJsonData(data, setData);
        setStatus(true);
      }
    };

    processData();
  }, [data, status]);

  useEffect(() => {
    const scheduleData = async () => {
      if (data != null && status) {
        const maxCredit = 20;
        const maxCoreCredit = 16;
        console.log("stage 1 to 2: ", data);
        await scheduleCourse(data, setSchedule, maxCredit, maxCoreCredit);
        setSchedule(true);
      }
    };

    scheduleData();
  }, [data, status, schedule]);
  return (
    <>
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Planner</h1>
      </div>
      <div className="flex w-full h-svh overflow-x-auto flex-1">
        {data == null || courseHashmap == null ? (
          <></>
        ) : (
          data.user_schedule.map((sem) => {
            return (
              <SemesterCard
                key={sem.order}
                refmap={courseHashmap}
                semester={sem}
              />
            );
          })
        )}
      </div>
    </>
  );
}
