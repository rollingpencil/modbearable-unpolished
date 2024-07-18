import { Listbox, ListboxItem } from "@nextui-org/react";

import { CourseCard } from "./courseCard";

import { PlannerCourseType, PlannerUserScheduleSemesterType } from "@/types";

type semesterCardType = {
  refmap: Map<string, PlannerCourseType>;
  semester: PlannerUserScheduleSemesterType;
};

let UNKNOWN_PLANNER_COURSE: PlannerCourseType = {
  code: "",
  name: "Unknown Course",
  courseType: "-",
  credits: 0,
  exempted: true,
  wildcard: false,
};

export const SemesterCard = ({ refmap, semester }: semesterCardType) => {
  return (
    <div className="w-1/5 min-w-fit h-full px-1">
      <h3 className="text-2xl px-3">{semester.name}</h3>
      <Listbox aria-label="" className="flex-1 overflow-y-auto ">
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
              <ListboxItem key={courseCode}>
                <CourseCard courseInfo={augmentedCourse} />
              </ListboxItem>
            );
          })
        )}
      </Listbox>
    </div>
  );
};
