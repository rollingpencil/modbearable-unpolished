import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
import { useSortable } from "@dnd-kit/react/sortable";

import { PlannerCourseType } from "@/types";

type courseCardType = {
  courseInfo: PlannerCourseType;
  semOrder: number;
  index: number;
};

export const CourseCard = ({ courseInfo, semOrder, index }: courseCardType) => {
  const { ref } = useSortable({
    id: courseInfo.code,
    index: index,
    group: semOrder,
    type: "course",
    accept: ["course"],
  });

  return (
    <Card ref={ref} className="bg-amber-500 text-white my-3 w-full" shadow="lg">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-lg">{courseInfo.code}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="text-lg">{courseInfo.name}</p>
        <p className="text-md">{courseInfo.credits} Credits</p>
      </CardBody>
      <CardFooter>
        {courseInfo.exempted ? (
          <Chip color="default" variant="flat">
            Exempted
          </Chip>
        ) : (
          <></>
        )}
      </CardFooter>
    </Card>
  );
};
