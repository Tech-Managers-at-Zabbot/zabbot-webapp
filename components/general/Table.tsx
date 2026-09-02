/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

// Generic Table Component
interface Column {
  key: string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  headerBackground?: string;
  headerTextColor?: string;
  rowBackground?: string;
  alternateRowBackground?: string;
  borderColor?: string;
  className?: string;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  headerBackground = "#FFFBEA",
  headerTextColor = "#1F2937",
  rowBackground = "#FFFFFF",
  alternateRowBackground = "#F9FAFB",
  borderColor = "#E5E7EB",
  className = "",
}) => {
  const getAlignment = (align?: string) => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  return (
    <div className={`w-full border-[#FEF3C6] border rounded-lg overflow-x-auto ${className}`}>
      <table
        className="w-full rounded-full border-collapse"
        style={{ fontFamily: "Lexend" }}
      >
        {/* Table Header */}
        <thead className="bg-red-900 rounded-lg">
          <tr style={{ backgroundColor: headerBackground }}>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-4 font-[500] text-base ${getAlignment(
                  column.align
                )}`}
                style={{
                  color: headerTextColor,
                  width: column.width,
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={{
                backgroundColor:
                  rowIndex % 2 === 0 ? rowBackground : alternateRowBackground,
              }}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-6 py-5 text-[15px] font-[400] text-[#4B5563] ${getAlignment(
                    column.align
                  )}`}
                  style={{
                    borderBottom: `1px solid ${borderColor}`,
                  }}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
