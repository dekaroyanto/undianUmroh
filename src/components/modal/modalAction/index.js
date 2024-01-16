import React from "react";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

export default function index({ isOpen, onClose, title, handleAction }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="l">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={handleAction}>
            Sure
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
