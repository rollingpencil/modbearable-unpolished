import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
  Chip,
} from "@nextui-org/react";
import { InfoOutlined } from "@ant-design/icons";

import { PrerequisiteDiagram } from "./prereqDiagram";

import {
  PlanarDataType,
  PlannerCourseType,
  PlannerUserScheduleSemesterType,
} from "@/types";

type CourseInfoModalProps = {
  data: PlanarDataType;
  setData: Function;
  course: PlannerCourseType;
  semOrder: number;
};

export const CourseInfoModal = ({
  data,
  setData,
  course,
  semOrder,
}: CourseInfoModalProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleDeleteCourse = () => {
    let updated_user_schedule: PlannerUserScheduleSemesterType[] =
      data.user_schedule;

    updated_user_schedule.forEach((sem, index, _2) => {
      if (sem.order == semOrder) {
        let modified_sem: PlannerUserScheduleSemesterType = sem;
        const newSemCourses = sem.courses.filter((c) => c != course.code);

        modified_sem.courses = newSemCourses;
        updated_user_schedule.splice(index, 1, modified_sem);
      }
    });

    let modified_user_defined_courses = data.user_defined_courses.filter(
      (c) => c.code != course.code,
    );

    setData({
      ...data,
      user_defined_courses: modified_user_defined_courses,
      user_schedule: updated_user_schedule,
    });
    onClose();
  };

  return (
    <>
      <Button
        isIconOnly
        className="capitalize ml-auto"
        color="default"
        size="md"
        variant="shadow"
        onPress={onOpen}
      >
        <InfoOutlined />
      </Button>
      <Modal
        backdrop="blur"
        hideCloseButton={true}
        isOpen={isOpen}
        placement="top-center"
        size="2xl"
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1> About {course.code}</h1>
                <h2>{course.name}</h2>
                <span className="flex-row">
                  <Chip className="mx-1" color="warning" variant="shadow">
                    {course.credits} Credits
                  </Chip>
                  <Chip className="mx-1" color="warning" variant="shadow">
                    Type: {course.courseType}
                  </Chip>
                  {course.exempted ? (
                    <Chip className="mx-1" color="success" variant="shadow">
                      Exempted
                    </Chip>
                  ) : (
                    <Chip className="mx-1" color="danger" variant="shadow">
                      Not Exempted
                    </Chip>
                  )}
                </span>
              </ModalHeader>
              <ModalBody>
                <PrerequisiteDiagram course={course} data={data} />
              </ModalBody>
              <ModalFooter>
                <Tooltip
                  color="danger"
                  content="You can only delete courses that you added."
                >
                  <span className="mr-auto">
                    <Button
                      color="danger"
                      isDisabled={
                        data.user_defined_courses
                          .map((c) => c.code)
                          .filter((c) => c == course.code).length == 0
                      }
                      variant="solid"
                      onPress={handleDeleteCourse}
                    >
                      DELETE
                    </Button>
                  </span>
                </Tooltip>

                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
