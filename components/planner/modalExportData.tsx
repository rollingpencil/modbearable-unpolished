import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Snippet,
} from "@nextui-org/react";
import { ExportOutlined } from "@ant-design/icons";

export const DataExportModal = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="capitalize mx-2"
        color="warning"
        size="lg"
        startContent={<ExportOutlined />}
        variant="flat"
        onPress={onOpen}
      >
        Export
      </Button>
      <Modal
        backdrop="blur"
        hideCloseButton={true}
        isOpen={isOpen}
        placement="top-center"
        size="5xl"
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Data Export
              </ModalHeader>
              <ModalBody className="w-full h-[50vh]">
                <Snippet
                  codeString={`${window.location.href}/${localStorage.getItem("data")}`}
                  symbol=""
                >
                  {`${window.location.href}/${localStorage.getItem("data")?.slice(0, 90)}...`}
                </Snippet>
              </ModalBody>
              <ModalFooter>
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
