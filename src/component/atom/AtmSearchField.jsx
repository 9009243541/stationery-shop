import { IconSearch } from "@tabler/icons-react";
import React from "react";

const AtmSearchField = ({
  name,
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  onBlur,
  disabled = false,
}) => {
  return (
    <div className="relative w-full">
      <input
        type="search"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full pr-10 pl-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
        disabled={disabled}
      />
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
        <IconSearch size={18} />
      </div>
    </div>
  );
};

export default AtmSearchField;
