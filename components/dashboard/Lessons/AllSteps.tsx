/* eslint-disable @typescript-eslint/no-explicit-any */
// import SearchBar from "@/components/general/SearchBar";
// import MainDropdown from "@/components/MainDropdown";
import React, { useState } from "react";
// import { IoSearchOutline } from "react-icons/io5";
// import { MdOutlineFilterList } from "react-icons/md";
import { StepsCard } from "../UserLessonDataComponent";
// import { lessonProgressData } from "@/constants/data-to-populate/dashboardData";
import Pagination from "../Pagination";
import { useGetLanguageLessons } from "@/services/generalApi/lessons/mutation";
import { useUser } from "@/contexts/UserContext";
import { DashboardMetricCardSkeleton } from "@/components/skeletonLoaders/DashboardSkeletons";
import { EmptyStateCard } from "@/components/general/EmptyState";
import { useTheme } from "@/contexts/ThemeProvider";

const AllSteps = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 12;

  const { userDetails } = useUser();

  const { theme } = useTheme();

  const { data: allLanguageSteps, isLoading: stepsLoading } =
    useGetLanguageLessons(userDetails?.languageId);

  const allSteps = allLanguageSteps?.data;

  const apiThumbnails = ["/userDashboard/say-hello.svg"];

  const allStepsWithThumbnails = Array.isArray(allSteps)
    ? allSteps.map((step, index) => ({
        ...step,
        thumbnailImage:
          apiThumbnails[index] || "/userDashboard/yoruba/coming-soon.svg",
      }))
    : [];

  const stepsToMap = [...allStepsWithThumbnails];

  // Calculate total pages based on your data
  // const totalPages = Math.ceil(lessonProgressData.length / itemsPerPage);

  // Get current page data
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentPageData = lessonProgressData.slice(startIndex, endIndex);

  // const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // const handleFilterClick = (filterName: string) => {
  //   setSelectedFilters((prev) =>
  //     prev.includes(filterName)
  //       ? prev.filter((f) => f !== filterName)
  //       : [...prev, filterName]
  //   );
  // };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Here you would typically make an API call to fetch the new page data
    // For now, we're just updating the local state
  };

  // const dropdownOptions = [
  //   {
  //     name: "Alphabetical",
  //     path: "",
  //   },
  //   {
  //     name: "Newest",
  //     path: "",
  //   },
  //   {
  //     name: "Oldest",
  //     path: "",
  //   },
  // ];

  // const filterMenu = [
  //   {
  //     name: "Completed",
  //     path: "",
  //   },
  //   {
  //     name: "In progress",
  //     path: "",
  //   },
  //   {
  //     name: "Explorer",
  //     path: "",
  //   },
  //   {
  //     name: "Foundation",
  //     path: "",
  //   },
  //   {
  //     name: "Builder",
  //     path: "",
  //   },
  // ];

  return (
    <div
      className="relative z-1 shadow-sm gap-4 md:gap-6 lg:gap-10 flex flex-col rounded-lg w-full max-w-full overflow-hidden"
      style={{
        fontFamily: "Lexend",
        color: "#162B6E",
        padding: "16px",
        background: theme === "dark" ? "#012657" : "white",
      }}
    >
      {/* Header Section - Made fully responsive */}
      <header className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
        <section className="min-w-0 flex-1 flex flex-col">
          {/* <h3
            className="font-semibold text-[18px] sm:text-[20px] lg:text-[24px] leading-tight"
            style={{ color: theme === "dark" ? "#FFFFFF" : "#162B6E" }}
          >
            Journey Hub
          </h3> */}
          <span
            className="font-semibold text-[16px] sm:text-[20px] lg:text-[24pxpx] leading-tight mt-1"
            style={{ color: theme === "dark" ? "white" : "#162B6E" }}
          >
            Immersing you in Yorùbá, one step at a time
          </span>
          <span
            className="text-[15px] leading-[100%] font-semibold"
            style={{ color: "#207EC5" }}
          >
            Building fluency through culture, sound, and eẹeryday moments.
          </span>
        </section>

        {/* Controls Section - Responsive layout */}
        {/* <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:gap-6 flex-shrink-0">
          <div className="w-full sm:w-auto sm:min-w-[200px]">
            <SearchBar icon={<IoSearchOutline size={20} />} />
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-4 lg:gap-6">
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[#8E8E8E] font-medium text-[12px] sm:text-[14px] leading-tight whitespace-nowrap">
                Add Filter
              </span>
              <span>
                <MdOutlineFilterList
                  className="hover:cursor-pointer"
                  size={20}
                  color={"#000000"}
                />
              </span>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[#8E8E8E] font-medium text-[12px] sm:text-[14px] leading-tight whitespace-nowrap">
                Sort by
              </span>
              <div className="min-w-0">
                <MainDropdown
                  options={dropdownOptions}
                  placeholder="Alphabetical"
                  color="#3E3E3E"
                  padding="6px 8px"
                  backgroundColor="#DCDEDD"
                  textHoverColor=""
                  fontWeight="500"
                  dropDownBackgroundColor="#8E8E8E"
                  isSetDropdown={true}
                  dropdownMaxWidth="180px"
                  dropdownMinWidth="120px"
                />
              </div>
            </div>
          </div>
        </section> */}
      </header>

      {/* Filter Tags Section - Responsive */}
      {/* <section className="w-full overflow-hidden">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {filterMenu.map((item, index) => (
            <div
              key={index}
              onClick={() => handleFilterClick(item.name)}
              className={`flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer transition-colors text-[12px] sm:text-[14px] whitespace-nowrap ${
                selectedFilters.includes(item.name)
                  ? "bg-[#CF0A5C] text-white border-[#CF0A5C]"
                  : "border-[#F2F2F2] hover:bg-[#DCDEDD] bg-[#F2F2F2] text-[#8F8F8F]"
              }`}
            >
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </section> */}

      {/* Courses Grid Section - Fully responsive grid */}
      <section className="w-full min-w-0">
        <div className="w-full">
          {stepsLoading ? (
            <div className="w-full flex gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <DashboardMetricCardSkeleton key={index} />
              ))}
            </div>
          ) : !allLanguageSteps?.data ||
            allLanguageSteps?.data?.length === 0 ? (
            <div className="w-full flex gap-2">
              {/* {Array.from({ length: 6 }).map((_, index) => ( */}
              <EmptyStateCard title="No data" subtitle="No courses yet" />
              {/* // ))} */}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center sm:justify-center items-center gap-4 sm:gap-6 md:gap-4">
              {stepsToMap.map(
                (lessonProgressData: Record<string, any>, index: number) => (
                  <div
                    key={index}
                    className="w-full min-w-[280px] max-w-[320px] flex-1 basis-[280px]"
                    style={{ maxWidth: "calc(20% - 1.6rem)" }}
                  >
                    <StepsCard
                      data={lessonProgressData}
                      isClickable={index === 0}
                    />
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      {/* <div className="border-t border-[#EAECF0] w-full"></div> */}

      {/* Pagination Section */}
      <section className="w-full overflow-x-auto">
        <Pagination
          currentPage={currentPage}
          totalPages={1}
          onPageChange={handlePageChange}
          maxVisiblePages={5} // Reduced for mobile
        />
      </section>
    </div>
  );
};

export default AllSteps;
