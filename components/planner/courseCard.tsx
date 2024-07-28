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
import { DragOutlined } from "@ant-design/icons";
import { useContext } from "react";

import { CourseInfoModal } from "./modalCourseInfo";

import { CourseErrorContext, PlanarDataType, PlannerCourseType } from "@/types";

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
  // Creating reference for the dndkit library to work
  const { handleRef, ref } = useSortable({
    id: courseInfo.code,
    index: index,
    group: semOrder,
    type: "course",
    accept: ["course"],
    disabled: courseInfo.exempted,
  });

  const courseError = useContext(CourseErrorContext);

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
            isDisabled={courseInfo.exempted}
            size="md"
            variant="solid"
          >
            <DragOutlined />
          </Button>
          <CourseInfoModal
            course={courseInfo}
            courseHashmap={courseHashmap}
            data={data}
            semOrder={semOrder}
            setData={setData}
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
            variant="flat"
          >
            Sem {semOffered}
          </Chip>
        ))}
        {courseError != undefined && courseError.has(courseInfo.code) ? (
          <Chip className="mx-1" color="danger" variant="solid">
            Prerequisite Error
          </Chip>
        ) : (
          <></>
        )}
      </CardFooter>
    </Card>
  );
};
