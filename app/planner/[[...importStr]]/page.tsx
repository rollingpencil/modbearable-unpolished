"use client";

import { DndContext } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { processJsonData } from "@/controller/engine";
import { title } from "@/components/primitives";
import { SemesterCard } from "@/components/planner/semesterCard";
import { PlanarDataType, PlannerCourseType } from "@/types";

export default function PlannerPage({
  params,
}: {
  params: { importStr: string };
}) {
  const [data, setData] = useState<PlanarDataType | null>(null);
  const [courseHashmap, setCourseHashmap] = useState<Map<
    string,
    PlannerCourseType
  > | null>(null);
  const [parent, setParent] = useState(null);

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
  const handleSchedule = (event: any) => {
    if (data != null) {
      try {
        processJsonData(data);
      } catch (error) {
        console.error("Error generating study schedule:", error);
      }
    } else {
      console.log("missing data");
    }
  };

  handleSchedule(data);
  console.log("DATA: ", data);
  const handleDragEnd = (event: any) => {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  };
  //handleSchedule(data);
  return (
    <>
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Planner</h1>
      </div>
      <DndContext>
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
      </DndContext>
    </>
  );
}
