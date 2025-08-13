/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react';
import { Eye, Edit, Trash2, Book, Clock } from 'lucide-react';
import { Course } from '@/types/interfaces';
import { Level } from '@/types/enums';

interface CourseListProps {
  courses: Course[];
  onViewCourse: (course: Course) => void;
  onEditCourse: (course: Course) => void;
  onDeleteCourse: (courseId: string) => void;
}

const CourseList: React.FC<CourseListProps> = ({
  courses,
  onViewCourse,
  onEditCourse,
  onDeleteCourse,
}) => {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (courseId: string) => {
    if (deleteConfirm === courseId) {
      onDeleteCourse(courseId);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(courseId);
      // Reset after 3 seconds
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const getLevelBadgeColor = (level: Level) => {
    switch (level) {
      case Level.BUILDER:
        return 'bg-green-100 text-green-800';
      case Level.EXPLORER:
        return 'bg-yellow-100 text-yellow-800';
      case Level.FOUNDATION:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return 'Not specified';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <Book size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
        <p className="text-gray-500">Create your first course to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
        >
          {/* Course Image */}
          <div className="h-48 bg-gray-200 relative overflow-hidden">
            {course.thumbnailImage ? (
              <img
                src={course.thumbnailImage}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
                <Book size={48} className="text-white" />
              </div>
            )}
            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {course.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          {/* Course Content */}
          <div className="p-4">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {course.description}
              </p>
            </div>

            {/* Course Meta */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(
                  course.level
                )}`}
              >
                {course.level}
              </span>
              <div className="flex items-center text-xs text-gray-500">
                <Clock size={12} className="mr-1" />
                {formatDuration(course.estimatedDuration)}
              </div>
            </div>

            {/* Tags */}
            {course.tags && course.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {course.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {course.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
                    +{course.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <button
                onClick={() => onViewCourse(course)}
                className="flex items-center hover:cursor-pointer px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
              >
                <Eye size={16} className="mr-1" />
                View
              </button>
              <button
                onClick={() => onEditCourse(course)}
                className="flex items-center hover:cursor-pointer px-3 py-2 text-sm font-medium text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
              >
                <Edit size={16} className="mr-1" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(course.id!)}
                className={`flex items-center hover:cursor-pointer px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  deleteConfirm === course.id
                    ? 'text-white bg-red-600 hover:bg-red-700'
                    : 'text-red-600 hover:text-red-800 hover:bg-red-50'
                }`}
              >
                <Trash2 size={16} className="mr-1" />
                {deleteConfirm === course.id ? 'Confirm' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;