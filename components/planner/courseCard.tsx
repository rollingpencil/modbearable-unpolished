import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
import { useSortable } from "@dnd-kit/react/sortable";

import { CourseInfoModal } from "./modalCourseInfo";

import { PlanarDataType, PlannerCourseType } from "@/types";
import { DragOutlined } from "@ant-design/icons";

type courseCardType = {
  courseInfo: PlannerCourseType;
  semOrder: number;
  index: number;
  data: PlanarDataType;
  courseHashmap: Map<string, PlannerCourseType> | null;
  setData: Function;
};

export const CourseCard = ({
  courseInfo,
  semOrder,
  index,
  data,
  setData,
  courseHashmap,
}: courseCardType) => {
  const { handleRef, ref } = useSortable({
    id: courseInfo.code,
    index: index,
    group: semOrder,
    type: "course",
    accept: ["course"],
  });

  return (
    <Card ref={ref} className="bg-amber-500 text-white my-3 w-full" shadow="lg">
      <CardHeader className="flex flex-row gap-3 pb-0">
        <div className="flex ">
          <p className="text-lg">{courseInfo.code}</p>
        </div>
        <span className="ml-auto">
          <Button
            ref={handleRef}
            isIconOnly
            className="capitalize mx-1"
            color="default"
            size="md"
            variant="solid"
          >
            <DragOutlined />
          </Button>
          <CourseInfoModal
            course={courseInfo}
            data={data}
            semOrder={semOrder}
            setData={setData}
            courseHashmap={courseHashmap}
          />
        </span>
      </CardHeader>
      <CardBody className="px-3 py-1">
        <p className="text-md">{courseInfo.name}</p>
      </CardBody>
      <Divider />
      <CardFooter className="flex-wrap">
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
        {courseInfo.semestersOffered!.map((semOffered) => (
          <Chip
            key={semOffered}
            className="mx-1"
            color="default"
            variant="solid"
          >
            Sem {semOffered}
          </Chip>
        ))}
      </CardFooter>
    </Card>
  );
};
