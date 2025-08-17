/* eslint-disable @typescript-eslint/no-explicit-any */
// import SearchBar from "@/components/general/SearchBar";
// import MainDropdown from "@/components/MainDropdown";
import React, { useState } from "react";
// import { IoSearchOutline } from "react-icons/io5";
// import { MdOutlineFilterList } from "react-icons/md";
import { CoursesCard } from "../UserLessonDataComponent";
// import { lessonProgressData } from "@/constants/data-to-populate/dashboardData";
import Pagination from "../Pagination";
import { useGetAllCourses } from "@/services/generalApi/lessons/mutation";
import { useUser } from "@/contexts/UserContext";
import { DashboardMetricCardSkeleton } from "@/components/skeletonLoaders/DashboardSkeletons";
import { EmptyStateCard } from "@/components/general/EmptyState";
import { useTheme } from "@/contexts/ThemeProvider";

const AllCourses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 12;

  const { userDetails } = useUser();

  const { theme } = useTheme();

  const { data: allCourses, isLoading: coursesLoading } = useGetAllCourses(
    userDetails?.languageId
  );

  const allData = allCourses?.data;

  const apiThumbnails = ["/userDashboard/yoruba/elderly-yoruba-woman.png"];

  const allCoursesWithThumbnails = Array.isArray(allData)
    ? allData.map((course, index) => ({
        ...course,
        thumbnailImage:
          apiThumbnails[index] || "/userDashboard/yoruba/coming-soon.svg",
      }))
    : [];

  const coursesToMap = [
    ...allCoursesWithThumbnails,
    {
      thumbnailImage: "/userDashboard/yoruba/journey-colors.png",
      title: "Colors, Shapes, Descriptions",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/yoruba-family.png",
      title: "Family & Social Interactions",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/stop-watch.png",
      title: "Numbers, Time & Daily Activities",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/golden-heart.png",
      title: "Politeness & Respect",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/big-baby.png",
      title: "Emotions & Expressions",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/food.png",
      title: "Food & Market Culture",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/mat.png",
      title: "Clothing & Self-Presentation",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/chores.png",
      title: "Home & Housing",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/health.png",
      title: "Health & Well-being",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/map-of-nigeria.png",
      title: "Travel & Places",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/travel.png",
      title: "Transport & Getting Around",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/sunset.svg",
      title: "Weather, Nature & Spirituality",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/reading.svg",
      title: "Work, School & Aspirations",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/dialogue-art.png",
      title: "Conflict Resolution & Apologies",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/culture.png",
      title: "Proverbs & Everyday Wisdom",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/talking-drums.png",
      title: "Music, Dance & Pop Culture",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/festival-drums.png",
      title: "Festivals & Traditions",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/customer-care.png",
      title: "Technology & Modern Life",
      estimatedDuration: 20,
      totalLessons: 10,
    },
    {
      thumbnailImage: "/userDashboard/yoruba/nigeria-flag-and-woman.png",
      title: "News, Politics & Community Issues",
      estimatedDuration: 20,
      totalLessons: 10,
    },
  ];

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
        background: theme === "dark" ? "#012657" : "#E0F9FA",
      }}
    >
      {/* Header Section - Made fully responsive */}
      <header className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
        <section className="min-w-0 flex-1">
          <h3
            className="font-semibold text-[18px] sm:text-[20px] lg:text-[24px] leading-tight"
            style={{ color: theme === "dark" ? "#FFFFFF" : "#162B6E" }}
          >
            Journey Hub
          </h3>
          <span
            className="font-semibold text-[12px] sm:text-[13px] lg:text-[15px] leading-tight mt-1"
            style={{ color: theme === "dark" ? "#ACDBFF" : "#207EC5" }}
          >
            Meaningful Yorùbá learning — one Journey at a time
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
          {coursesLoading ? (
            <div className="w-full flex gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <DashboardMetricCardSkeleton key={index} />
              ))}
            </div>
          ) : !allCourses?.data || allCourses?.data?.length === 0 ? (
            <div className="w-full flex gap-2">
              {/* {Array.from({ length: 6 }).map((_, index) => ( */}
              <EmptyStateCard title="No data" subtitle="No courses yet" />
              {/* // ))} */}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center sm:justify-center items-center gap-4 sm:gap-6 md:gap-4">
              {coursesToMap.map(
                (lessonProgressData: Record<string, any>, index: number) => (
                  <div
                    key={index}
                    className="w-full min-w-[280px] max-w-[320px] flex-1 basis-[280px]"
                    style={{ maxWidth: "calc(20% - 1.6rem)" }}
                  >
                    <CoursesCard
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

export default AllCourses;
