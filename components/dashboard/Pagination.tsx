import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(currentPage - halfVisible, 1);
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = visiblePages[0] > 2;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages - 1;

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
          currentPage === 1
            ? "border-[#EAECF0] text-[#8E8E8E] cursor-not-allowed"
            : "border-[#EAECF0] text-[#162B6E] hover:bg-[#F3F4F6] cursor-pointer"
        }`}
        style={{ fontFamily: "Lexend" }}
      >
        <IoChevronBack size={16} />
        <span className="text-sm font-medium">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {/* First page if not visible */}
        {visiblePages[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={`w-10 h-10 flex items-center justify-center rounded-[50%] border transition-colors ${
                currentPage === 1
                  ? "bg-[#A8D5F0] border-[#A8D5F0] text-[#162B6E]"
                  : "border-[#EAECF0] text-[#162B6E] hover:bg-[#F3F4F6]"
              }`}
              style={{ fontFamily: "Lexend" }}
            >
              <span className="text-sm font-medium">1</span>
            </button>
            {showStartEllipsis && (
              <span className="px-2 text-[#8E8E8E] text-sm">...</span>
            )}
          </>
        )}

        {/* Visible page numbers */}
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-[50%] border transition-colors ${
              currentPage === page
                ? "bg-[#A8D5F0] border-[#A8D5F0] text-[#162B6E]"
                : "border-[#EAECF0] text-[#162B6E] hover:bg-[#F3F4F6]"
            }`}
            style={{ fontFamily: "Lexend" }}
          >
            <span className="text-sm font-medium">{page}</span>
          </button>
        ))}

        {/* Last page if not visible */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {showEndEllipsis && (
              <span className="px-2 text-[#8E8E8E] text-sm">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className={`w-10 h-10 flex items-center justify-center rounded-[50%] border transition-colors ${
                currentPage === totalPages
                  ? "bg-[#A8D5F0] border-[#A8D5F0] text-[#162B6E]"
                  : "border-[#EAECF0] text-[#162B6E] hover:bg-[#F3F4F6]"
              }`}
              style={{ fontFamily: "Lexend" }}
            >
              <span className="text-sm font-medium">{totalPages}</span>
            </button>
          </>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
          currentPage === totalPages
            ? "border-[#EAECF0] text-[#8E8E8E] cursor-not-allowed"
            : "border-[#EAECF0] text-[#162B6E] hover:bg-[#F3F4F6] cursor-pointer"
        }`}
        style={{ fontFamily: "Lexend" }}
      >
        <span className="text-sm font-medium">Next</span>
        <IoChevronForward size={16} />
      </button>
    </div>
  );
};

export default Pagination;