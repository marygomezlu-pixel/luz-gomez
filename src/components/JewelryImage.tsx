import React, { useState } from 'react';
import { Gem } from 'lucide-react';

interface JewelryImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const JewelryImage: React.FC<JewelryImageProps> = ({ src, alt, className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF4F7] via-[#FCE6EE] to-[#F3D5DF] text-[#B8295B] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Gem className="w-8 h-8 mb-2 opacity-75" strokeWidth={1.5} />
        <span className="text-xs font-medium tracking-wide text-[#6E4B57] line-clamp-2 max-w-[180px]">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={`object-cover ${className}`}
    />
  );
};
