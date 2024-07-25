import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
// import { useSortable } from "@dnd-kit/react/sortable";

import { CourseInfoModal } from "./modalCourseInfo";

import { PlanarDataType, PlannerCourseType } from "@/types";

type courseCardType = {
  courseInfo: PlannerCourseType;
  semOrder: number;
  index: number;
  data: PlanarDataType;
  setData: Function;
};

export const CourseCard = ({
  courseInfo,
  semOrder,
  index,
  data,
  setData,
}: courseCardType) => {
  // const { ref } = useSortable({
  //   id: courseInfo.code,
  //   index: index,
  //   group: semOrder,
  //   type: "course",
  //   accept: ["course"],
  // });

  return (
    <Card className="bg-amber-500 text-white my-3 w-full" shadow="lg">
      <CardHeader className="flex flex-row gap-3 pb-0">
        <div className="flex ">
          <p className="text-lg">{courseInfo.code}</p>
        </div>
        <CourseInfoModal
          course={courseInfo}
          data={data}
          semOrder={semOrder}
          setData={setData}
        />
      </CardHeader>
      <CardBody className="px-3 py-1">
        <p className="text-md">{courseInfo.name}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Chip className="m-1" color="default" variant="solid">
          {courseInfo.credits} Credits
        </Chip>
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
