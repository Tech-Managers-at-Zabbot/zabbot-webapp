import { useTheme } from "@/contexts/ThemeProvider";
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
  // Adjust maxVisiblePages based on screen size
  const getResponsiveMaxPages = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 480) return 3; // Mobile
      if (width < 768) return 4; // Small tablets
      return maxVisiblePages; // Desktop
    }
    return maxVisiblePages;
  };

    const { theme } = useTheme()

  const getVisiblePages = () => {
    const responsiveMaxPages = getResponsiveMaxPages();
    
    if (totalPages <= responsiveMaxPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(responsiveMaxPages / 2);
    let startPage = Math.max(currentPage - halfVisible, 1);
    const endPage = Math.min(startPage + responsiveMaxPages - 1, totalPages);

    if (endPage - startPage + 1 < responsiveMaxPages) {
      startPage = Math.max(endPage - responsiveMaxPages + 1, 1);
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
    <div className="flex items-center justify-center w-full overflow-x-auto">
      <div className="flex items-center gap-1 sm:gap-2 py-2 sm:py-4 px-2 min-w-fit">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg border transition-colors flex-shrink-0 ${
            currentPage === 1
              ? "border-[#EAECF0] text-[#8E8E8E] cursor-not-allowed"
              : `border-[#EAECF0] ${theme === 'light' ? 'text-[#162B6E] hover:bg-[#F3F4F6]' : 'text-[#a9d5f0] hover:bg-[#162B6E]'}  cursor-pointer`
          }`}
          style={{ fontFamily: "Lexend" }}
        >
          <IoChevronBack size={14} className="sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm font-medium hidden xs:inline">Previous</span>
          <span className="text-xs sm:text-sm font-medium xs:hidden">Prev</span>
        </button>

        {/* Page Numbers Container */}
        <div className="flex items-center gap-0.5 sm:gap-1 mx-1 sm:mx-2">
          {/* First page if not visible */}
          {visiblePages[0] > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className={`w-8 h-8 hover:cursor-pointer sm:w-10 sm:h-10 flex items-center justify-center rounded-[50%] border transition-colors flex-shrink-0 ${
                  currentPage === 1
                    ? "bg-[#A8D5F0] border-[#A8D5F0] text-[#162B6E]"
                    : `border-[#EAECF0] ${theme === 'light' ? 'text-[#162B6E] hover:bg-[#F3F4F6]' : 'text-[#a9d5f0] hover:bg-[#162B6E]'}`
                }`}
                style={{ fontFamily: "Lexend" }}
              >
                <span className="text-xs sm:text-sm font-medium">1</span>
              </button>
              {showStartEllipsis && (
                <span className="px-1 sm:px-2 text-[#8E8E8E] text-xs sm:text-sm flex-shrink-0">...</span>
              )}
            </>
          )}

          {/* Visible page numbers */}
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 sm:w-10 hover:cursor-pointer sm:h-10 flex items-center justify-center rounded-[50%] border transition-colors flex-shrink-0 ${
                currentPage === page
                  ? "bg-[#A8D5F0] border-[#A8D5F0] text-[#162B6E]"
                  : `border-[#EAECF0] ${theme === 'light' ? 'text-[#162B6E] hover:bg-[#F3F4F6]' : 'text-[#a9d5f0] hover:bg-[#162B6E]'}`
              }`}
              style={{ fontFamily: "Lexend" }}
            >
              <span className="text-xs sm:text-sm font-medium">{page}</span>
            </button>
          ))}

          {/* Last page if not visible */}
          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {showEndEllipsis && (
                <span className="px-1 sm:px-2 text-[#8E8E8E] text-xs sm:text-sm flex-shrink-0">...</span>
              )}
              <button
                onClick={() => onPageChange(totalPages)}
                className={`w-8 h-8 sm:w-10 hover:cursor-pointer sm:h-10 flex items-center justify-center rounded-[50%] border transition-colors flex-shrink-0 ${
                  currentPage === totalPages
                    ? "bg-[#A8D5F0] border-[#A8D5F0] text-[#162B6E]"
                    : `border-[#EAECF0] ${theme === 'light' ? 'text-[#162B6E] hover:bg-[#F3F4F6]' : 'text-[#a9d5f0] hover:bg-[#162B6E]'}`
                }`}
                style={{ fontFamily: "Lexend" }}
              >
                <span className="text-xs sm:text-sm font-medium">{totalPages}</span>
              </button>
            </>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg border transition-colors flex-shrink-0 ${
            currentPage === totalPages
              ? "border-[#EAECF0] text-[#8E8E8E] cursor-not-allowed"
              : `border-[#EAECF0] ${theme === 'light' ? 'text-[#162B6E] hover:bg-[#F3F4F6]' : 'text-[#a9d5f0] hover:bg-[#162B6E]'}`
          }`}
          style={{ fontFamily: "Lexend" }}
        >
          <span className="text-xs sm:text-sm font-medium hidden xs:inline">Next</span>
          <span className="text-xs sm:text-sm font-medium xs:hidden">Next</span>
          <IoChevronForward size={14} className="sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;