import React from 'react';
import { Check, Info, AlertCircle, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ToastNotification: React.FC = () => {
  const { toast, dismissToast } = useCart();

  if (!toast) return null;

  const icon =
    toast.type === 'success' ? (
      <Check className="w-4 h-4 text-[#B8295B]" aria-hidden="true" />
    ) : toast.type === 'error' ? (
      <AlertCircle className="w-4 h-4 text-red-700" aria-hidden="true" />
    ) : (
      <Info className="w-4 h-4 text-[#C78A47]" aria-hidden="true" />
    );

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 max-w-sm bg-white border border-[#F3D5DF] shadow-lg rounded-lg px-4 py-3 flex items-center gap-3 transition-transform duration-200"
    >
      <span className="w-7 h-7 rounded-full bg-[#FCE6EE] flex items-center justify-center shrink-0">
        {icon}
      </span>
      <p className="text-sm font-medium text-[#2A151D] flex-1">{toast.message}</p>
      <button
        type="button"
        onClick={dismissToast}
        aria-label="Cerrar notificación"
        className="text-[#6E4B57] hover:text-[#2A151D] p-1 rounded transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
