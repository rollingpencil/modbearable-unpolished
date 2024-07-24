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
} from "@nextui-org/react";

import { PlanarDataType, PlannerUserScheduleSemesterType } from "@/types";

type AddSemesterModalProps = {
  data: PlanarDataType;
  setData: Function;
};

export const AddSemesterModal = ({ data, setData }: AddSemesterModalProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [semName, setSemName] = useState<string | undefined>(undefined);

  const handleAddSemester = () => {
    if (semName != undefined) {
      const newSemester: PlannerUserScheduleSemesterType = {
        order: data.user_schedule.length,
        name: semName,
        courses: [],
        mark_complete: false,
      };

      let modifiedUserSchedule = data.user_schedule;

      modifiedUserSchedule.push(newSemester);
      setData({ ...data, user_schedule: modifiedUserSchedule });
      onClose();
    }
  };

  return (
    <>
      <Button
        size="lg"
        variant="flat"
        color="warning"
        onPress={onOpen}
        className="capitalize mx-2"
      >
        Add Semester
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        onClose={onClose}
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Semester
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  placeholder="Semester XX"
                  isRequired
                  variant="bordered"
                  isClearable
                  onValueChange={(value) => {
                    value == "" ? setSemName(undefined) : setSemName(value);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="warning" onPress={handleAddSemester}>
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
