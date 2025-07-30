import React, { ChangeEvent } from "react";

interface AtmTextFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  step?: string | number;
  disabled?: boolean;
}

const AtmTextField: React.FC<AtmTextFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  className = "",
  step = "1", 
  disabled = false,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`px-4 py-2 border rounded ${className}`}
        step={type === "number" ? step : undefined}
        min="0" 
        disabled={disabled} 
      />
    </div>
  );
};

export default AtmTextField;
