"use client";

import { DragDropProvider } from "@dnd-kit/react";
import { useEffect, useState } from "react";
import { Button, Chip } from "@nextui-org/react";
import { BuildOutlined, DiffOutlined, SaveOutlined } from "@ant-design/icons";

import {
  dependencyCheck,
  processJsonDataSimple,
  scheduleCourse,
} from "@/controller/engine";
import { title } from "@/components/primitives";
import { SemesterCard } from "@/components/planner/semesterCard";
import { CourseErrorContext, PlanarDataType, PlannerCourseType } from "@/types";
import { AddSemesterModal } from "@/components/planner/modalSemesterAdd";
import { AddCourseModal } from "@/components/planner/modalCourseAdd";
import { redirectToOnboarding } from "@/app/actions";
import {
  GeneralNoticeModal,
  GeneralNoticeModalMessage,
} from "@/components/planner/generalNoticeModal";
import { DataExportModal } from "@/components/planner/modalExportData";

export default function PlannerPage({
  params,
}: {
  params: { importStr: string };
}) {
  const [status, setStatus] = useState<boolean>(false);
  const [message, setMessage] = useState<GeneralNoticeModalMessage | null>(
    null,
  );
  const [courseError, setCourseError] = useState<Map<string, string[]>>();
  const [temp, setTemp] = useState<boolean>(false);
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

        setTemp(true);

        try {
          setData(JSON.parse(atob(importStringDecoded)));
          setMessage({
            type: "primary",
            content:
              "You are viewing an imported schedule, no data would be saved locally until you press save.",
            callback: () => {
              setMessage(null);
            },
            callbackName: "Dismiss",
          });
        } catch (error) {
          setMessage({
            type: "warning",
            content:
              "It looks like the link you tried contains corrupt data. Please request your friend to resend their link again.",
            callback: () => {
              window.location = "/planner" as unknown as Location;
              setTemp(false);
              setMessage(null);
            },
            callbackName: "Go to local plan",
          });
          setData(null);
        }
      } else {
        let localStorageData = localStorage.getItem("data");

        console.log(`From localStorage | ${localStorageData}`);

        if (localStorageData == null) {
          setMessage({
            type: "warning",
            content:
              "It looks like there is no existing data stored. Please head to onboarding page to set it up",
            callback: () => {
              redirectToOnboarding();
              setMessage(null);
            },
            callbackName: "Go to Onboarding",
          });
          setData(null);
        } else {
          try {
            setData(JSON.parse(atob(localStorageData)));
          } catch (error) {
            setMessage({
              type: "warning",
              content:
                "It looks like the data stored is corrupt. Please head to onboarding page to reset the data again.",
              callback: () => {
                redirectToOnboarding();
                setMessage(null);
              },
              callbackName: "Go to Onboarding",
            });
            setData(null);
          }
        }
      }
    }
  }, [data]);

  useEffect(() => {
    if (data != null) {
      if (status) {
        let masterCourseList = [
          ...data.base_requirements,
          ...data.non_base_exemptions,
          ...data.user_defined_courses,
        ];
        let masterCourseHashmap = new Map(
          masterCourseList.map((c) => [c.code, c]),
        );

        setCourseHashmap(masterCourseHashmap);
      } else {
        setCourseHashmap(null);
      }
    }
  }, [data, status]);

  useEffect(() => {
    if (data != null && status == true && temp == false) {
      console.log("Checking data");
      let localStorageData = localStorage.getItem("data");

      if (localStorageData == null) {
        localStorageData = "";
      }
      const currentData = window.btoa(JSON.stringify(data));

      if (currentData != localStorageData) {
        console.log("Saving to local storage");
        localStorage.setItem("data", currentData);
      }
    }
  }, [data, status, temp]);

  const handleSave = () => {
    setTemp(false);
    window.location = "/planner" as unknown as Location;
  };

  const handleValidate = () => {
    dependencyCheck(data, courseHashmap, setCourseError);
  };

  const handleSchedule = () => {
    scheduleCourse(data, setData, setCourseError);
  };

  useEffect(() => {
    if (data != null && status == false) {
      // processJsonData(data, setData, setStatus);
      processJsonDataSimple(data, setData, setStatus);
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
      <GeneralNoticeModal message={message} />
      <div className="inline-flex w-full items-center">
        {data == null || courseHashmap == null ? (
          <h1 className={title()}>Planner</h1>
        ) : (
          <>
            <span>
              <h1 className={title()}>{data.major} Major</h1>
              <br />
              <span className="ml-1">
                <Chip className="m-1" color="warning" variant="flat">
                  Cohort: {data.cohort}
                </Chip>

                <Chip className="m-1" color="warning" variant="flat">
                  Credits Planned{" "}
                  {[
                    ...data.base_requirements,
                    ...data.non_base_exemptions,
                    ...data.user_defined_courses,
                  ]
                    .filter((c) => c.creditable)
                    .map((c) => c.credits)
                    .reduce((a, c) => a + c, 0)}{" "}
                  / {data.total_cu} Required
                </Chip>
              </span>
            </span>

            <span className="ml-auto w-[45%] flex flex-wrap flex-row justify-end items-center">
              <Button
                className="capitalize m-2"
                color="warning"
                size="lg"
                startContent={<BuildOutlined />}
                variant="flat"
                onPress={handleSchedule}
              >
                Schedule
              </Button>
              <Button
                className="capitalize m-2"
                color="warning"
                size="lg"
                startContent={<DiffOutlined />}
                variant="flat"
                onPress={handleValidate}
              >
                Validate
              </Button>
              {temp ? (
                <Button
                  className="capitalize m-2"
                  color="warning"
                  size="lg"
                  startContent={<SaveOutlined />}
                  variant="flat"
                  onPress={handleSave}
                >
                  Temporary - Save?
                </Button>
              ) : (
                <></>
              )}

              <AddSemesterModal data={data} setData={setData} />
              <AddCourseModal
                data={data}
                setData={setData}
                setUpToDate={setStatus}
              />
              {!temp ? <DataExportModal /> : <></>}
            </span>
          </>
        )}
      </div>

      <div className="flex w-full h-svh overflow-x-auto flex-1">
        <CourseErrorContext.Provider value={courseError!}>
          <DragDropProvider onDragOver={handleDragOver}>
            {data == null || courseHashmap == null || status == false ? (
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
        </CourseErrorContext.Provider>
      </div>
    </>
  );
}
