import React, { ChangeEvent } from "react";

interface AtmTextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
}

const AtmTextAreaField: React.FC<AtmTextAreaFieldProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  className = "",
  rows = 3,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`px-4 py-2 border rounded w-full ${className}`}
        rows={rows}
      />
    </div>
  );
};

export default AtmTextAreaField;
