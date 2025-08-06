/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course, CreateCoursePayload } from "@/types/interfaces";
import axiosInstance from "../../axiosInstance";

// --- Course Endpoints ---

export async function createCourse(courseData: CreateCoursePayload) {
  const response = await axiosInstance.post("/courses", courseData);
  return response.data;
}

export async function createCourseWithLessons(courseData: any, languageId:string) {
  const response = await axiosInstance.post(`/lessons/courses/course-with-lesson/${languageId}`, courseData);
  return response.data;
}

export async function getCourses(isActive = true, languageId:string) {
  const response = await axiosInstance.get(`/lessons/courses/${languageId}?isActive=${isActive}`);
  return response.data;
}

export async function getCourseWithLessons(languageId: string) {
  const response = await axiosInstance.get(`/lessons/courses/get-course-with-lesson/${languageId}`);
  return response.data;
}

export async function getLessonWithContents(id: string | any) {
  const response = await axiosInstance.get(`/lessons/lessons/lesson-with-contents/${id}`);
  return response.data;
}

export async function getCourse(id: string) {
  const response = await axiosInstance.get(`/courses/${id}`);
  return response.data;
}

export async function updateCourse(id: string, courseData: Partial<Course>) {
  const response = await axiosInstance.put(`/courses/${id}`, courseData);
  return response.data;
}

export async function deleteCourse(id: string) {
  const response = await axiosInstance.delete(`/courses/${id}`);
  return response.data;
}

// --- Language Endpoints ---

export async function getLanguages(params?: { isActive?: boolean }) {
  const response = await axiosInstance.get("/languages", {
    params,
  });
  return response.data;
}

// --- Lesson Endpoints ---

export async function createLesson(lessonData: any) {
  const response = await axiosInstance.post("/lessons", lessonData);
  return response.data;
}

export async function getLessons(courseId?: string) {
  const response = await axiosInstance.get("/lessons", {
    params: courseId ? { courseId } : {},
  });
  return response.data;
}

// --- Content Endpoints ---

export async function createContent(contentData: any) {
  const response = await axiosInstance.post("/contents", contentData);
  return response.data;
}

export async function getLessonContents(lessonId: string) {
  const response = await axiosInstance.get(`/contents/lesson/${lessonId}`);
  return response.data;
}

// --- Language Content Endpoints ---

export async function getLanguageContents(languageId?: string) {
  const response = await axiosInstance.get("/language-contents", {
    params: languageId ? { languageId } : {},
  });
  return response.data;
}

export async function createLanguageContent(contentData: any) {
  const response = await axiosInstance.post("/language-contents", contentData);
  return response.data;
}