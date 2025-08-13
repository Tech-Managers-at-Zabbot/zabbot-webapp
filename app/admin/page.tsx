/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Course, Lesson } from "@/types/interfaces";
import { Level } from "@/types/enums";
import CourseList from "@/components/admin/courses/CourseList";
import ViewCourseModal from "@/components/admin/courses/ViewCourseModal";
import EditCourseModal from "@/components/admin/courses/EditCourseModal";
import { useRouter } from "next/navigation";
import { useLoading } from "@/contexts/LoadingProvider";
import InAppButton from "@/components/InAppButton";
import { useTheme } from "@/contexts/ThemeProvider";
import { useGetAllCourses } from "@/services/generalApi/lessons/mutation";
import { useUser } from "@/contexts/UserContext";
import { DashboardMetricCardSkeleton } from "@/components/skeletonLoaders/DashboardSkeletons";
import { EmptyStateCard } from "@/components/general/EmptyState";
import AddQuizModal from "@/components/admin/courses/AddQuizModal";

const CourseManagementPage: React.FC = () => {
  const { userDetails } = useUser();

  const [showAddQuizModal, setShowAddQuizModal] = useState(false);
  // Add this handler
  const handleOpenAddQuizModal = () => {
    setShowAddQuizModal(true);
  };

  const { data: allCoursesData, isLoading: allCoursesLoading } =
    useGetAllCourses(userDetails?.languageId);

  const apiThumbnails = ["/userDashboard/yoruba/elderly-yoruba-woman.png"];

  const allCoursesWithThumbnails = Array.isArray(allCoursesData?.data)
    ? allCoursesData?.data.map((step: Record<string, any>, index: number) => ({
        ...step,
        thumbnailImage:
          apiThumbnails[index] || "/userDashboard/yoruba/coming-soon.svg",
      }))
    : [];

  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>(
    allCoursesWithThumbnails || []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState<Level | "">("");
  const [statusFilter, setStatusFilter] = useState<"active" | "inactive" | "">(
    ""
  );

  const { setLoading } = useLoading();

  const { theme } = useTheme();

  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | any>({});

  // Filter courses based on search and filters
  const filteredCourses = courses?.filter((course: Record<string, any>) => {
    const matchesSearch =
      course?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course?.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = !levelFilter || course.level === levelFilter;
    const matchesStatus =
      !statusFilter ||
      (statusFilter === "active" && course.isActive) ||
      (statusFilter === "inactive" && !course.isActive);

    return matchesSearch && matchesLevel && matchesStatus;
  });

  useEffect(() => {
    if (!allCoursesLoading && allCoursesWithThumbnails.length > 0) {
      setCourses(allCoursesWithThumbnails);
    }
  }, [allCoursesLoading, allCoursesData?.data]);

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setViewModalOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setEditModalOpen(true);
  };

  const handleSaveQuiz = () => {
    // setViewModalOpen(true);
    setTimeout(() => {
      setEditModalOpen(true);
    }, 100);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== courseId));
    // Here you would typically make an API call to delete the course
    console.log("Deleting course:", courseId);
  };

  const handleSaveCourse = (courseData: Course) => {
    setCourses((prev) =>
      prev.map((course) => (course.id === courseData.id ? courseData : course))
    );
    // Here you would typically make an API call to save the course
    console.log("Saving course:", courseData);
  };

  const handleSaveLesson = (lessonData: Lesson) => {
    // Update lesson in the mock data or make API call
    console.log("Saving lesson:", lessonData);
  };

  const handleDeleteLesson = (lessonId: string) => {
    // Delete lesson from mock data or make API call
    console.log("Deleting lesson:", lessonId);
  };

  const handleDeleteQuiz = (quizId: string) => {
    // Delete quiz or make API call
    console.log("Deleting quiz:", quizId);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setLevelFilter("");
    setStatusFilter("");
  };

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "Lexend",
        backgroundColor: theme === "dark" ? "#012657" : "#dff9fb",
      }}
    >
      <div className="px-[5%] relative w-full mx-auto pt-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div style={{ color: theme === "dark" ? "#D0F7F6" : "#202124" }}>
              <h1 className="text-3xl font-bold">Admin Management</h1>
              <p className="mt-2">Manage your language learning journeys</p>
            </div>
            <InAppButton
              onClick={() => {
                setLoading(true);
                router.push("/admin/create-course");
              }}
              background={theme === "dark" ? "#dff9fb" : "#012657"}
            >
              <div
                className="text-white flex justify-center items-center"
                style={{ color: theme === "dark" ? "#012657" : "#dff9fb" }}
              >
                <Plus size={20} className="mr-2" />
                Create New Journey
              </div>
            </InAppButton>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white relative z-20 mt-30 rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#012657]"
              />
              <input
                type="text"
                placeholder="Search Journeys..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-[#012657] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value as Level | "")}
              className="w-full px-3 py-2 border text-[#012657] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Levels</option>
              <option value={Level.BUILDER}>Builder</option>
              <option value={Level.EXPLORER}>Explorer</option>
              <option value={Level.FOUNDATION}>Foundation</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "active" | "inactive" | "")
              }
              className="w-full px-3 py-2 border border-gray-300 text-[#012657] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md flex items-center justify-center"
            >
              <Filter size={16} className="mr-2" />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Course List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {allCoursesLoading ? (
            <div className="flex gap-[15px] min-w-max">
              {Array.from({ length: 6 }).map((_, index) => (
                <DashboardMetricCardSkeleton key={index} />
              ))}
            </div>
          ) : !allCoursesData?.data || allCoursesData?.data?.length === 0 ? (
            <div className="flex gap-[15px] min-w-max">
              {/* {Array.from({ length: 6 }).map((_, index) => ( */}
              <EmptyStateCard
                // key={index}
                title="No data"
                subtitle="No courses yet"
              />
              {/* ))} */}
            </div>
          ) : (
            <CourseList
              courses={filteredCourses}
              onViewCourse={handleViewCourse}
              onEditCourse={handleEditCourse}
              onDeleteCourse={handleDeleteCourse}
            />
          )}
        </div>
      </div>

      {/* View Course Modal */}
      {selectedCourse && (
        <ViewCourseModal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          course={selectedCourse}
        />
      )}

      {/* Edit Course Modal */}
      {selectedCourse && (
        <EditCourseModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          course={selectedCourse}
          onSaveCourse={handleSaveCourse}
          onSaveLesson={handleSaveLesson}
          onDeleteLesson={handleDeleteLesson}
          onDeleteQuiz={handleDeleteQuiz}
          onOpenAddQuizModal={handleOpenAddQuizModal}
        />
      )}

      {selectedCourse && (
        <AddQuizModal
          isOpen={showAddQuizModal}
          onClose={() => {
            setShowAddQuizModal(false);
          }}
          courseId={selectedCourse.id}
          languageId={selectedCourse.languageId}
          onSaveQuiz={handleSaveQuiz}
        />
      )}
    </div>
  );
};

export default CourseManagementPage;
