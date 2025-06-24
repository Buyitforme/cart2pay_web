// Components/ConfirmModal.tsx
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "./Button";
import { Text } from "./Typography";



interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="bg-white rounded-xl shadow-lg p-6 z-50 w-full max-w-md space-y-4 relative">
        {children}
      </div>
    </Dialog>
  );
};

export default Modal;


