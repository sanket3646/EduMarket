import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={clsx(
        "bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={clsx("p-4 sm:p-6", className)}>
      {children}
    </div>
  );
};

export default { Card, CardContent };
