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
  Checkbox,
  Tooltip,
} from "@nextui-org/react";

import { PlanarDataType, PlannerUserScheduleSemesterType } from "@/types";

type ModifySemesterModalProps = {
  data: PlanarDataType;
  setData: Function;
  semester: PlannerUserScheduleSemesterType;
};

export const ModifySemesterModal = ({
  data,
  setData,
  semester,
}: ModifySemesterModalProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [semName, setSemName] = useState<string | undefined>(undefined);
  const [complete, setComplete] = useState<boolean>(semester.mark_complete);

  // Check if the name of the semester has been changed and if so update the semester name in planner data
  const handleModifySemester = () => {
    if (semName != undefined) {
      semester.name = semName;
    }
    semester.mark_complete = complete;

    let updated_user_schedule: PlannerUserScheduleSemesterType[] =
      data.user_schedule;

    updated_user_schedule.forEach((sem, index, us) => {
      if (sem.order == semester.order) {
        updated_user_schedule.splice(index, 1, semester);
      }
    });

    setData({ ...data, user_schedule: updated_user_schedule });

    onClose();
  };

  // Check if there are existing course set under this semester, if none, proceed with delete
  const handleDeleteSemester = () => {
    let updated_user_schedule: PlannerUserScheduleSemesterType[] =
      data.user_schedule;

    updated_user_schedule.forEach((sem, index, us) => {
      if (sem.order == semester.order) {
        updated_user_schedule.splice(index, 1);
      } else if (sem.order > semester.order) {
        sem.order = sem.order - 1;
        updated_user_schedule.splice(index, 1, sem);
      }
    });

    setData({ ...data, user_schedule: updated_user_schedule });

    onClose();
  };

  return (
    <>
      <Button
        className="capitalize mx-2"
        color="warning"
        size="sm"
        variant="flat"
        onPress={onOpen}
      >
        Edit
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
                Edit {semester.name}
              </ModalHeader>
              <ModalBody>
                <Input
                  isClearable
                  isRequired
                  defaultValue={semester.name}
                  label="Name"
                  variant="bordered"
                  onValueChange={(value) => {
                    value == "" || value == semester.name
                      ? setSemName(undefined)
                      : setSemName(value);
                  }}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                    isSelected={complete}
                    radius="full"
                    onValueChange={setComplete}
                  >
                    Mark semester as complete
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Tooltip
                  color="danger"
                  content="You can only delete when the semester is empty of courses."
                >
                  <span className="mr-auto">
                    <Button
                      color="danger"
                      isDisabled={semester.courses.length > 0}
                      variant="solid"
                      onPress={handleDeleteSemester}
                    >
                      DELETE
                    </Button>
                  </span>
                </Tooltip>

                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="warning" onPress={handleModifySemester}>
                  Modify
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
