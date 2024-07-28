import {
  Button,
  ButtonVariantProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect } from "react";

export type GeneralNoticeModalMessage = {
  type: string;
  content: string;
  callback: Function;
  callbackName: string;
};

type GeneralNoticeModalProps = {
  message: GeneralNoticeModalMessage | null;
};

export const GeneralNoticeModal = ({ message }: GeneralNoticeModalProps) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  // Check if there is a message to display and if so, display it.
  useEffect(() => {
    if (message != null) {
      onOpen();
    }
  }, [message]);

  const handleCallback = () => {
    message!.callback();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} size="2xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Notice</ModalHeader>
              <ModalBody>
                <p>{message!.content}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color={message!.type as ButtonVariantProps["color"]}
                  variant="solid"
                  onPress={handleCallback}
                >
                  {message!.callbackName}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
