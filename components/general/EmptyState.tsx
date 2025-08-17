import React from "react";
import { EmptyStateCardIcon } from "../../constants/SvgPaths";

interface EmptyStateCardProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  title,
  subtitle,
  icon = <EmptyStateCardIcon />,
}) => {
  return (
    <div
      className="bg-white w-full h-full border border-dashed border-gray-300 flex flex-col items-center justify-center gap-4 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
      style={{ fontFamily: "Lexend" }}
    >
      <div className="text-4xl text-gray-400">{icon}</div>

      <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
        {title}
      </h3>

      <p className="text-sm sm:text-base text-gray-500">{subtitle}</p>
    </div>
  );
};
