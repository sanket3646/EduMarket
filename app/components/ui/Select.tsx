import React, { useState, ReactNode } from "react";
import clsx from "clsx";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export const Select = ({ value, onValueChange, children, className }: SelectProps) => {
  return (
    <div className={clsx("relative w-full", className)}>
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition"
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export const SelectItem = ({ children, value }: { children: ReactNode; value: string }) => {
  return <option value={value}>{children}</option>;
};

export const SelectTrigger = ({ children }: { children: ReactNode }) => <>{children}</>;
export const SelectValue = ({ placeholder }: { placeholder?: string }) => (
  <>{placeholder}</>
);
export const SelectContent = ({ children }: { children: ReactNode }) => <>{children}</>;
