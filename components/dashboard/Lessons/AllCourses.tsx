import SearchBar from "@/components/general/SearchBar";
import MainDropdown from "@/components/MainDropdown";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFilterList } from "react-icons/md";
import { CoursesCard, LessonProps } from "../UserLessonDataComponent";
import { lessonProgressData } from "@/constants/data-to-populate/dashboardData";
import Pagination from "../Pagination";

const AllCourses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Calculate total pages based on your data
  const totalPages = Math.ceil(lessonProgressData.length / itemsPerPage);

  // Get current page data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = lessonProgressData.slice(startIndex, endIndex);

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterClick = (filterName: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterName)
        ? prev.filter((f) => f !== filterName)
        : [...prev, filterName]
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Here you would typically make an API call to fetch the new page data
    // For now, we're just updating the local state
  };

  const dropdownOptions = [
    {
      name: "Alphabetical",
      path: "",
    },
    {
      name: "Newest",
      path: "",
    },
    {
      name: "Oldest",
      path: "",
    },
  ];

  const filterMenu = [
    {
      name: "Completed",
      path: "",
    },
    {
      name: "In progress",
      path: "",
    },
    {
      name: "Explorer",
      path: "",
    },
    {
      name: "Foundation",
      path: "",
    },
    {
      name: "Builder",
      path: "",
    },
  ];

  return (
    <div
      className="border shadow-sm border-[#EAECF0] gap-10 flex flex-col rounded-lg bg-white w-full"
      style={{ fontFamily: "Lexend", color: "#162B6E", padding: "24px" }}
    >
      <header className="flex justify-between items-center flex-wrap">
        <section className="min-w-0 flex-1 flex flex-col gap-2">
          <h3 className="font-semibold text-[20px] sm:text-[24px] leading-[100%] text-[#162B6E]">
            Courses
          </h3>
          <span className="font-semibold text-[13px] sm:text-[15px] leading-[100%] text-[#207EC5]">
            Yorùbá courses learners love!
          </span>
        </section>

        <section className="flex items-center gap-10 flex-shrink-0">
          <div>
            <SearchBar icon={<IoSearchOutline size={20} />} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#8E8E8E] font-medium text-[14px]leading-[100%]">
              Add Filter
            </span>
            <span>
              <MdOutlineFilterList
                className="hover:cursor-pointer"
                size={24}
                color={"#000000"}
              />
            </span>
          </div>
          <div className="flex-shrink-0 items-center flex gap-2">
            <span className="text-[#8E8E8E] font-medium text-[14px]leading-[100%]">
              Sort by
            </span>
            <MainDropdown
              options={dropdownOptions}
              placeholder="Alphabetical"
              color="#3E3E3E"
              padding="8px 12px"
              backgroundColor="#DCDEDD"
              textHoverColor=""
              fontWeight="500"
              dropDownBackgroundColor="#8E8E8E"
              isSetDropdown={true}
              dropdownMaxWidth="200px"
              dropdownMinWidth=""
            />
          </div>
        </section>
      </header>

      <section>
        <div className="mt-6 flex flex-wrap gap-4">
          {filterMenu.map((item, index) => (
            <div
              key={index}
              onClick={() => handleFilterClick(item.name)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                selectedFilters.includes(item.name)
                  ? "bg-[#CF0A5C] text-white border-[#CF0A5C]"
                  : "border-[#F2F2F2] hover:bg-[#DCDEDD] bg-[#F2F2F2] text-[#8F8F8F]"
              }`}
            >
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[15px]">
        {currentPageData.map(
          (lessonProgressData: LessonProps, index: number) => (
            <div key={index} className="min-w-0">
              <CoursesCard {...lessonProgressData} />
            </div>
          )
        )}
      </section>

      {/* Divider */}
      <div className="border-t border-[#EAECF0]"></div>

      <section className="">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxVisiblePages={5}
        />
      </section>
    </div>
  );
};

export default AllCourses;
