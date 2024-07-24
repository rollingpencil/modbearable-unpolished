"use client";

import { DragDropProvider } from "@dnd-kit/react";
import { useEffect, useState } from "react";

import { processJsonData } from "@/controller/engine";
import { title } from "@/components/primitives";
import { SemesterCard } from "@/components/planner/semesterCard";
import { PlanarDataType, PlannerCourseType } from "@/types";
import { AddSemesterModal } from "@/components/planner/modalSemesterAdd";

export default function PlannerPage({
  params,
}: {
  params: { importStr: string };
}) {
  const [status, setStatus] = useState(false);
  const [data, setData] = useState<PlanarDataType | null>(null);
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
    if (data != null && status == false) {
      processJsonData(data, setData);
      setStatus(true);
    }
  }, [data, status]);

  const handleDragOver = (event: any) => {
    const { source, target } = event.operation;

    if (source && target) {
      const srcSem: number = source.sortable.group;
      const srcSemIdx: number = source.sortable.index;
      const course: string = source.id;

      let destSem: number = -1;
      let destSemIdx: number = -1;

      if ("sortable" in target) {
        destSem = target.sortable.group;
        destSemIdx = target.sortable.index;
      } else {
        destSem = target.id;
        destSemIdx = 0;
      }

      let modifiedUserSchedule = data!.user_schedule;

      for (let sem of modifiedUserSchedule) {
        if (sem.order == srcSem) {
          sem.courses.splice(srcSemIdx, 1);
        }
        if (sem.order == destSem) {
          sem.courses.splice(destSemIdx, 0, course);
        }
      }

      setData({
        ...data!,
        user_schedule: modifiedUserSchedule,
      });
    }
  };

  return (
    <>
      <div className="inline-flex w-full items-center">
        <h1 className={title()}>Planner</h1>
        {data == null || courseHashmap == null ? (
          <></>
        ) : (
          <AddSemesterModal data={data} setData={setData} />
        )}
      </div>

      <div className="flex w-full h-svh overflow-x-auto flex-1">
        <DragDropProvider onDragOver={handleDragOver}>
          {data == null || courseHashmap == null ? (
            <></>
          ) : (
            data.user_schedule.map((sem) => {
              return (
                <SemesterCard
                  key={sem.order}
                  data={data}
                  refmap={courseHashmap}
                  semester={sem}
                  setData={setData}
                />
              );
            })
          )}
        </DragDropProvider>
      </div>
    </>
  );
}
