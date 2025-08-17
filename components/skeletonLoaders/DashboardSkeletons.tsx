import React from 'react';
import { Box, CircularProgress } from "@mui/material";

const skeletonPulse = {
  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  "@keyframes pulse": {
    "0%, 100%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0.5,
    },
  },
};

export const DailyGoalsSkeleton = () => {
  return (
    <div
      className="bg-white justify-between shadow-md flex rounded-lg border border-[#EAECF0] flex-col p-[16px] sm:p-[20px] h-full"
      style={{ fontFamily: "Lexend" }}
    >
      <section>
        {/* Title skeleton */}
        <div
          className="h-[24px] sm:h-[28px] md:h-[32px] bg-gray-200 rounded w-[120px] mb-2"
          style={skeletonPulse}
        />
        {/* Subtitle skeleton */}
        <div
          className="h-[14px] sm:h-[16px] md:h-[18px] bg-gray-200 rounded w-full max-w-[300px]"
          style={skeletonPulse}
        />
        <div
          className="h-[14px] sm:h-[16px] md:h-[18px] bg-gray-200 rounded w-[80%] mt-1"
          style={skeletonPulse}
        />
      </section>

      <section className="flex h-full justify-center items-center my-2 sm:my-4">
        {/* Circular progress skeleton */}
        <Box position="relative" display="inline-flex">
          <CircularProgress
            variant="determinate"
            value={100}
            size={120}
            thickness={5}
            sx={{
              color: "#F2F4F7",
            }}
          />
          <CircularProgress
            variant="determinate"
            value={0}
            size={120}
            thickness={5}
            sx={{
              color: "#E5E7EB",
              position: "absolute",
              left: 0,
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {/* Percentage text skeleton */}
            <div
              className="h-[24px] w-[40px] bg-gray-200 rounded"
              style={skeletonPulse}
            />
          </Box>
        </Box>
      </section>
    </div>
  );
};

export const WordForTheDaySkeleton = () => {
  return (
    <div
      className="bg-white justify-between items-center shadow-md flex rounded-lg border border-[#EAECF0] flex-col p-[16px] sm:p-[20px] h-full"
      style={{ fontFamily: "Lexend" }}
    >
      {/* Title skeleton */}
      <div
        className="h-[23px] sm:h-[26px] md:h-[30px] bg-gray-200 rounded w-[140px]"
        style={skeletonPulse}
      />

      {/* Main word skeleton */}
      <div
        className="h-[36px] sm:h-[42px] md:h-[48px] bg-gray-200 rounded w-[160px] my-2 sm:my-4"
        style={skeletonPulse}
      />

      <div className="flex flex-col gap-[12px] sm:gap-[16px] md:gap-[20px] w-full">
        {/* Description skeleton */}
        <div className="space-y-2">
          <div
            className="h-[16px] sm:h-[18px] md:h-[20px] bg-gray-200 rounded w-full"
            style={skeletonPulse}
          />
          <div
            className="h-[16px] sm:h-[18px] md:h-[20px] bg-gray-200 rounded w-[85%]"
            style={skeletonPulse}
          />
        </div>

        {/* Speaker button skeleton */}
        <div className="flex justify-center items-center">
          <div
            className="rounded-full w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] bg-gray-200 border border-gray-300"
            style={skeletonPulse}
          />
        </div>
      </div>
    </div>
  );
};

export const DashboardMetricCardSkeleton = () => {
return (
  <div
    className="bg-white w-full border border-gray-200 flex flex-col gap-[24px] rounded-lg p-4 sm:p-6 shadow-sm animate-pulse"
    style={{ fontFamily: "Lexend" }}
  >
    <div className="flex justify-start items-center mb-2 sm:mb-4">
      <div className="h-5 sm:h-6 lg:h-7 bg-gray-200 rounded w-3/4 max-w-xs"></div>
    </div>

    <div className="flex justify-between items-start sm:items-center gap-4">
      <div className="mb-2 sm:mb-4 flex-1">
        <div className="h-6 sm:h-8 lg:h-9 bg-gray-200 rounded w-1/2 max-w-sm mb-2"></div>
      </div>

      <div className="flex justify-start sm:justify-end flex-shrink-0">
        <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);
};

const skeletonStyles = `
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
`;

// Define types for skeleton elements
type SkeletonElementType = 'line' | 'circle' | 'rectangle' | 'square' | 'custom';

interface SkeletonElement {
  type: SkeletonElementType;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  rounded?: boolean | string; // true for rounded, string for custom border-radius
  count?: number; // For multiple lines
  spacing?: string; // Gap between multiple elements
}

interface SkeletonLoaderProps {
  // Container props
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  
  // Layout props
  direction?: 'row' | 'column';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch';
  gap?: string;
  padding?: string;
  
  // Skeleton elements
  elements: SkeletonElement[];
  
  // Animation props
  animate?: boolean;
  animationDuration?: string;
  baseColor?: string;
  highlightColor?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  containerClassName = '',
  containerStyle = {},
  direction = 'column',
  justify = 'start',
  align = 'start',
  gap = '12px',
  padding = '16px',
  elements,
  animate = true,
  animationDuration = '2s',
  baseColor = '#E5E7EB',
  // highlightColor = '#F3F4F6',
}) => {
  
  const getJustifyClass = (justify: string) => {
    const justifyMap = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };
    return justifyMap[justify as keyof typeof justifyMap] || 'justify-start';
  };

  const getAlignClass = (align: string) => {
    const alignMap = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    };
    return alignMap[align as keyof typeof alignMap] || 'items-start';
  };

  const getFlexDirection = (direction: string) => {
    return direction === 'row' ? 'flex-row' : 'flex-col';
  };

  const renderSkeletonElement = (element: SkeletonElement, index: number) => {
    const {
      type,
      width = '100%',
      height = '20px',
      className = '',
      style = {},
      rounded = false,
      count = 1,
      spacing = '8px',
    } = element;

    const baseElementStyle: React.CSSProperties = {
      backgroundColor: baseColor,
      ...(animate && {
        animation: `pulse ${animationDuration} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
      }),
      ...style,
    };

    const getRoundedClass = () => {
      if (typeof rounded === 'string') return '';
      if (rounded === true) {
        switch (type) {
          case 'circle':
            return 'rounded-full';
          case 'line':
            return 'rounded';
          case 'rectangle':
          case 'square':
            return 'rounded-md';
          default:
            return 'rounded';
        }
      }
      return '';
    };

    const getTypeSpecificClasses = () => {
      switch (type) {
        case 'circle':
          return 'rounded-full';
        case 'line':
          return 'rounded';
        case 'rectangle':
          return 'rounded-md';
        case 'square':
          return 'rounded-md';
        default:
          return '';
      }
    };

    const elementClasses = `
      ${getTypeSpecificClasses()}
      ${getRoundedClass()}
      ${className}
    `.trim();

    const elementStyle: React.CSSProperties = {
      ...baseElementStyle,
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      ...(typeof rounded === 'string' && { borderRadius: rounded }),
    };

    if (count > 1) {
      return (
        <div
          key={index}
          className="flex flex-col"
          style={{ gap: spacing }}
        >
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className={elementClasses}
              style={elementStyle}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        key={index}
        className={elementClasses}
        style={elementStyle}
      />
    );
  };

  const containerClasses = `
    flex
    ${getFlexDirection(direction)}
    ${getJustifyClass(justify)}
    ${getAlignClass(align)}
    ${containerClassName}
  `.trim();

  return (
    <>
      <style>{skeletonStyles}</style>
      <div
        className={containerClasses}
        style={{
          gap,
          padding,
          ...containerStyle,
        }}
      >
        {elements.map((element, index) => renderSkeletonElement(element, index))}
      </div>
    </>
  );
};

export default SkeletonLoader;