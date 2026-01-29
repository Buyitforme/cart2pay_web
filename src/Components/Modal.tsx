// Components/ConfirmModal.tsx
import { X } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        className={`relative z-50 bg-white rounded-lg shadow-lg ${className} text-center animate-scaleUp`}
      >
        
         <button
                    onClick={onClose}
                    className=" rounded-full bg-white/20 hover:bg-white/30 absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:rotate-90"
                    aria-label="Close reminder"
                  >
                    <X size={24} />
                        

                  </button>
                  <div className="mt-5 py-8 px-6">
                    {children}
                  </div>
        
      </div>
    </div>
  );
};

export default Modal;
