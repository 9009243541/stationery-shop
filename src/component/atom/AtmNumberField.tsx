import React, { ChangeEvent } from "react";

interface AtmNumberFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  step?: string | number;
  min?: string | number;
  max?: string | number;
}

const AtmNumberField: React.FC<AtmNumberFieldProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  className = "",
  step = "1",
  min = "0",
  max,
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
        type="number"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
       className={`px-4 py-2 border rounded outline-none appearance-none 
          [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${className}`}
        step={step}
        min={min}
        max={max}
      />
    </div>
  );
};

export default AtmNumberField;
