import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import {
  buildWhatsAppGenericUrl,
  buildWhatsAppProductUrl,
  WhatsAppOrderPayload,
} from '../utils/formatters';

interface WhatsAppButtonProps {
  payload?: WhatsAppOrderPayload;
  customMessage?: string;
  label?: string;
  variant?: 'primary' | 'outline' | 'subtle';
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  payload,
  customMessage,
  label = 'Comprar por WhatsApp',
  variant = 'outline',
  className = '',
}) => {
  const { socialConfig } = useCart();

  const href = payload
    ? buildWhatsAppProductUrl(payload, socialConfig.whatsappNumberRaw)
    : buildWhatsAppGenericUrl(
        customMessage || 'Hola Luz Gomez Joyería, me gustaría recibir asesoría sobre sus joyas.',
        socialConfig.whatsappNumberRaw
      );

  const variantClasses =
    variant === 'primary'
      ? 'bg-[#2A151D] text-white hover:bg-[#462532] border border-[#2A151D]'
      : variant === 'subtle'
      ? 'bg-[#FFF4F7] text-[#2A151D] hover:bg-[#FCE6EE] border border-[#F3D5DF]'
      : 'bg-white text-[#2A151D] hover:bg-[#FFF4F7] border border-[#EAB8C9]';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap ${variantClasses} ${className}`}
    >
      <MessageCircle className="w-4 h-4 text-[#B8295B] shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
};
