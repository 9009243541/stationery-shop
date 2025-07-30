import React, { useState, ChangeEvent } from "react";
import { AiOutlineEyeInvisible, AiTwotoneEye } from "react-icons/ai";

interface AtmPasswordFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: any;
  placeholder?: string;
  className?: string;
}

const AtmPasswordField: React.FC<AtmPasswordFieldProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  className = "",
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        type={isPasswordVisible ? "text" : "password"}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`px-4 py-2 border rounded w-full ${className}`}
      />
      <span
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-9 cursor-pointer"
      >
        {isPasswordVisible ? (
          <AiTwotoneEye className="w-5 h-5 text-gray-500" />
        ) : (
          < AiOutlineEyeInvisible className="w-5 h-5 text-gray-500" />
        )}
      </span>
    </div>
  );
};

export default AtmPasswordField;
