import React, { ChangeEvent } from "react";

interface AtmRadioButtonProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const AtmRadioButton: React.FC<AtmRadioButtonProps> = ({
  label,
  name,
  value,
  checked,
  onChange,
  className = "",
}) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={`mr-2 ${className}`}
      />
      <label htmlFor={value} className="text-gray-700 text-sm">
        {label}
      </label>
    </div>
  );
};

export default AtmRadioButton;
