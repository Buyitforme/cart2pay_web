// Components/ConfirmModal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  className 
}: ModalProps & { className?: string }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        className={`relative z-50 bg-white  rounded-lg shadow-lg  ${className} text-center`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
