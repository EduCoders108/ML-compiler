"use client";

import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="rounded-xl bg-white p-6  shadow-xl transition-all hover:-translate-y-1 dark:bg-gray-800">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
        {icon}
      </div>
      <h3 className="mb-2 font-serif text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default FeatureCard;
