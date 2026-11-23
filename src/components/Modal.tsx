import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidthClass?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidthClass = 'max-w-2xl',
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A151D]/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className={`relative w-full ${maxWidthClass} max-h-[90vh] overflow-y-auto bg-[#FFFDFB] border border-[#F3D5DF] rounded-xl shadow-2xl p-6 sm:p-8`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#F3D5DF]">
          <h2 className="text-2xl font-semibold text-[#2A151D]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#6E4B57] hover:text-[#2A151D] hover:bg-[#FCE6EE] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
