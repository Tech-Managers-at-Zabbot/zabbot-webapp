/* eslint-disable @typescript-eslint/no-explicit-any */
// import SearchBar from "@/components/general/SearchBar";
// import MainDropdown from "@/components/MainDropdown";
import React, { 
  // useState 
} from "react";
// import { IoSearchOutline } from "react-icons/io5";
// import { MdOutlineFilterList } from "react-icons/md";
// import { lessonProgressData } from "@/constants/data-to-populate/dashboardData";
import {
  // useGetAllCourses,
  useGetCoursesWithLessons,
} from "@/services/generalApi/lessons/mutation";
import { useUserGoals } from "@/contexts/UserGoalsContext";
import { DashboardMetricCardSkeleton } from "@/components/skeletonLoaders/DashboardSkeletons";
import { EmptyStateCard } from "@/components/general/EmptyState";
import { LessonsCard2 } from "../dashboard/UserLessonDataComponent";
// import Pagination from "../dashboard/Pagination";

const AllCourseLessons = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 12;

  const { userDetails } = useUserGoals();

  const { data: coursesWithLessons, isLoading: lessonsLoading } =
    useGetCoursesWithLessons(userDetails?.languageId);

  const courseLessons = coursesWithLessons?.data?.lessons;

  const apiThumbnails = [
    "/userDashboard/say-hello.svg",
  ];

  const allStepsWithThumbnails = Array.isArray(courseLessons) 
  ? courseLessons.map((lesson, index) => ({
      ...lesson,
      thumbnailImage: apiThumbnails[index] || "/userDashboard/yoruba/coming-soon.svg"
    }))
  : [];

  const stepsToMap = [
    ...allStepsWithThumbnails,
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

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  //   // Here you would typically make an API call to fetch the new page data
  //   // For now, we're just updating the local state
  // };

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
      className="border z-2 shadow-sm border-[#EAECF0] gap-4 md:gap-6 lg:gap-10 flex flex-col rounded-lg bg-white w-full max-w-full overflow-hidden"
      style={{ fontFamily: "Lexend", color: "#162B6E", padding: "16px" }}
    >
      {/* Header Section - Made fully responsive */}
      <header className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
        <section className="min-w-0 flex-1">
          <span className="font-semibold flex flex-col text-[18px] sm:text-[20px] lg:text-[24px] leading-tight text-[#162B6E]">
            Journey Catalog
          </span>
          <span className="font-semibold text-[12px] sm:text-[13px] lg:text-[15px] leading-tight text-[#207EC5] mt-1">
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
          {lessonsLoading ? (
            <div className="w-full flex gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <DashboardMetricCardSkeleton key={index} />
              ))}
            </div>
          ) : !coursesWithLessons?.data || coursesWithLessons?.data?.lessons?.length === 0 ? (
            <div className="w-full flex gap-2">
              {/* {Array.from({ length: 6 }).map((_, index) => ( */}
              <EmptyStateCard title="No data" subtitle="No courses yet" />
              {/* // ))} */}
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6 lg:gap-[20px] auto-rows-fr">
              {stepsToMap?.map(
                (lessonProgressData: Record<string, any>, index: number) => (
                  <div
                    key={index}
                    className="min-w-0 w-full flex justify-center"
                  >
                    <div className="w-full max-w-[278px]">
                      <LessonsCard2 data={lessonProgressData} isClickable={index === 0} />
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-[#EAECF0] w-full"></div>

      {/* Pagination Section */}
      {/* <section className="w-full overflow-x-auto">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxVisiblePages={5} // Reduced for mobile
        />
      </section> */}
    </div>
  );
};

export default AllCourseLessons;
