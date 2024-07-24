import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";

import {
  PlanarDataType,
  PlannerCourseType,
  PlannerUserScheduleSemesterType,
} from "@/types";
import { retrieveSpecificMods } from "@/utils/nusmods-client";

type AddCourseModalProps = {
  data: PlanarDataType;
  setData: Function;
  setUpToDate: Function;
};

export const AddCourseModal = ({
  data,
  setData,
  setUpToDate,
}: AddCourseModalProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [courseCode, setCourseCode] = useState<string | undefined>(undefined);
  const [sem, setSem] = useState<number | undefined>(undefined);
  const [validCourseCode, setValidCourseCode] = useState<boolean>(true);

  const handleAddCourse = () => {
    if (courseCode != undefined && sem != undefined) {
      const courseInfoPromise = retrieveSpecificMods(
        data.cohort,
        courseCode,
        false,
      );

      Promise.all([courseInfoPromise])
        .then((rawdata: Array<any>) => {
          setValidCourseCode(true);
          const courseInfo = rawdata[0];

          let newCourseData: PlannerCourseType = {
            code: courseCode,
            name: courseInfo.title,
            courseType: courseCode.startsWith("GE") ? "GE" : "Others",
            credits: courseInfo.moduleCredit,
            exempted: false,
            wildcard: false,
            add_prerequisites: [],
            take_together: [],
          };

          let modified_user_defined_courses = data.user_defined_courses;

          modified_user_defined_courses.push(newCourseData);

          let updated_user_schedule: PlannerUserScheduleSemesterType[] =
            data.user_schedule;

          updated_user_schedule.forEach((semData, index, us) => {
            if (semData.order == sem) {
              semData.courses.push(courseCode);
              updated_user_schedule.splice(index, 1, semData);
            }
          });

          setData({
            ...data,
            user_defined_courses: modified_user_defined_courses,
            user_schedule: updated_user_schedule,
          });
          setUpToDate(false);
          setCourseCode(undefined);
          setSem(undefined);
          onClose();
        })
        .catch(() => {
          setValidCourseCode(false);
        });
    }
  };

  return (
    <>
      <Button
        className="capitalize mx-2"
        color="warning"
        size="lg"
        variant="flat"
        onPress={onOpen}
      >
        Add Course
      </Button>
      <Modal
        backdrop="blur"
        hideCloseButton={true}
        isOpen={isOpen}
        placement="top-center"
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Course
              </ModalHeader>
              <ModalBody>
                <Input
                  isClearable
                  isRequired
                  defaultValue=""
                  errorMessage="Please enter a valid course code"
                  isInvalid={!validCourseCode}
                  label="Name"
                  placeholder="CS1231S"
                  variant="bordered"
                  onValueChange={(value) => {
                    value == ""
                      ? setCourseCode(undefined)
                      : setCourseCode(value);
                  }}
                />
                <Select
                  isRequired
                  label="Semester"
                  placeholder="Select an semester"
                  onChange={(e) => setSem(Number(e.target.value))}
                >
                  {data.user_schedule
                    .filter((sem) => sem.order != 1)
                    .map((sem) => (
                      <SelectItem key={sem.order}>{sem.name}</SelectItem>
                    ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="warning" onPress={handleAddCourse}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
