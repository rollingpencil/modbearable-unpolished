import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { CourseCard } from "./courseCard";
import { ModifySemesterModal } from "./modalSemesterModify";

import {
  PlanarDataType,
  PlannerCourseType,
  PlannerUserScheduleSemesterType,
} from "@/types";

type semesterCardType = {
  refmap: Map<string, PlannerCourseType>;
  semester: PlannerUserScheduleSemesterType;
  data: PlanarDataType;
  setData: Function;
};

let UNKNOWN_PLANNER_COURSE: PlannerCourseType = {
  code: "",
  name: "Unknown Course",
  courseType: "-",
  credits: 0,
  exempted: true,
  wildcard: false,
  add_prerequisites: [],
  take_together: [],
};

export const SemesterCard = ({
  refmap,
  semester,
  data,
  setData,
}: semesterCardType) => {
  const { ref: dropRef } = useDroppable({
    id: semester.order,
    type: "semester",
    accept: ["course"],
    collisionPriority: CollisionPriority.Low,
  });

  const [totalSemCU, setTotalSemCU] = useState<number | undefined>(undefined);

  useEffect(() => {
    setTotalSemCU(
      semester.courses
        .map((c, i, arr) => refmap.get(c))
        .map((c, i, arr) => c!.credits)
        .filter((c) => typeof c === "number")
        .reduce((a, c) => a + c, 0),
    );
  }, [semester, refmap]);

  return (
    <div className="w-1/5 min-w-72 h-full px-2">
      <div className="flex flex-col">
        <div className="inline-flex flex-row w-full">
          <h3 className="text-2xl">{semester.name}</h3>
          <ModifySemesterModal
            data={data}
            semester={semester}
            setData={setData}
          />
        </div>
        {totalSemCU == undefined ? (
          <></>
        ) : (
          <Chip color="default" variant="dot">
            {totalSemCU} Credits
          </Chip>
        )}
        {semester.mark_complete ? (
          <Chip className="" color="success" variant="dot">
            Done
          </Chip>
        ) : (
          <Chip color="secondary" variant="dot">
            Not Done
          </Chip>
        )}
      </div>
      <div ref={dropRef} className="flex-1 overflow-y-auto">
        {refmap == null ? (
          <></>
        ) : (
          semester.courses.map((courseCode) => {
            let augmentedCourse: PlannerCourseType = {
              ...UNKNOWN_PLANNER_COURSE,
              code: courseCode,
            };

            if (refmap.has(courseCode)) {
              augmentedCourse = refmap.get(courseCode)!;
              // Have to force TypeScript to comply with ! since we alr checked hasmap for said course code
            }

            return (
              <CourseCard
                key={courseCode}
                courseInfo={augmentedCourse}
                data={data}
                index={semester.courses.indexOf(courseCode)}
                semOrder={semester.order}
                setData={setData}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
