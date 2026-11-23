import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Buscar joyas...',
  className = '',
}) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form onSubmit={handleFormSubmit} className={`relative flex items-center ${className}`} role="search">
      <Search
        className="w-4 h-4 text-[#6E4B57] absolute left-3.5 pointer-events-none"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full bg-white border border-[#F3D5DF] rounded-lg pl-10 pr-9 py-2.5 text-sm text-[#2A151D] placeholder:text-[#6E4B57]/75 focus:border-[#B8295B] transition-colors"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Limpiar búsqueda"
          className="absolute right-2.5 p-1 text-[#6E4B57] hover:text-[#2A151D] rounded"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </form>
  );
};
