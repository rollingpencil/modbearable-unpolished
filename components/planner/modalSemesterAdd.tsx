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
} from "@nextui-org/react";
import { PlusOutlined } from "@ant-design/icons";

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

      let modifiedUserSchedule = [...data.user_schedule, newSemester];

      setData({ ...data, user_schedule: modifiedUserSchedule });
      setSemName(undefined);
      onClose();
    }
  };

  return (
    <>
      <Button
        className="capitalize mx-2"
        color="warning"
        size="lg"
        startContent={<PlusOutlined />}
        variant="flat"
        onPress={onOpen}
      >
        Semester
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
                Add Semester
              </ModalHeader>
              <ModalBody>
                <Input
                  isClearable
                  isRequired
                  defaultValue=""
                  label="Name"
                  placeholder="Semester XX"
                  variant="bordered"
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
