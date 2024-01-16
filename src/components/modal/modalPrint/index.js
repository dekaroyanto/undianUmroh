import React from "react";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

export default function index({ isOpen, onClose, handleAction }) {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <Button color="primary">Print Receipt</Button>
                  <Button color="primary">Reprint Transaction</Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
