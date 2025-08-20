// src/components/common/AtmSkeleton.jsx
import React from "react";
import clsx from "clsx";

const AtmSkeleton = ({ 
  variant = "text", // "text" | "circle" | "rect"
  width = "100%", 
  height = "16px", 
  className = "" 
}) => {
  const baseClass = "animate-pulse bg-gray-300 rounded";

  const getClasses = () => {
    switch (variant) {
      case "circle":
        return "rounded-full";
      case "rect":
        return "rounded-md";
      default:
        return "rounded";
    }
  };

  return (
    <div
      className={clsx(baseClass, getClasses(), className)}
      style={{ width, height }}
    />
  );
};

export default AtmSkeleton;
