import React from 'react';

const IconAttribution = ({ iconName, iconUrl }: {
  iconName: string;
  iconUrl: string;
}) => {
  return (
    <div className="text-sm text-center text-[#78716C] opacity-70">
      <a
        href={iconUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        {iconName}
      </a>{" "}
      icon by{" "}
      <a
        href="https://icons8.com"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        Icons8
      </a>
    </div>
  );
};

export default IconAttribution