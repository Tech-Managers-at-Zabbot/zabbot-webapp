/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateCoursePayload } from "@/types/interfaces";
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

export async function getLanguageLessons(languageId?: string) {
  const response = await axiosInstance.get(`/lessons/lessons/language-lessons/${languageId}`);
  return response.data;
}

export async function getCourse(id: string, projections?: string) {
  const params: any = {};
  if (projections && projections.length > 0) {
    params.projections = projections;
  }
  const response = await axiosInstance.get(`/lessons/courses/single-course/${id}`, {
    params: Object.keys(params).length > 0 ? params : undefined
  });
  
  return response.data;
}

export async function addQuiz(payload: Record<string, any>) {
  const response = await axiosInstance.post(`/lessons/quizzes/create-quiz`, payload);
  return response.data;
}

export async function getCourseQuizzes(courseId: string) {
  const response = await axiosInstance.get(`/lessons/quizzes/${courseId}`);
  return response.data;
}

// --- Language Endpoints ---

// export async function getLanguages(params?: { isActive?: boolean }) {
//   const response = await axiosInstance.get("/languages", {
//     params,
//   });
//   return response.data;
// }

// --- Lesson Endpoints ---

export async function createLesson(lessonData: any) {
  const response = await axiosInstance.post("/lessons", lessonData);
  return response.data;
}

export async function getCourseLessons(courseId: string) {
  const response = await axiosInstance.get(`/lessons/lessons/course-lessons/${courseId}`);
  return response.data;
}

// --- Content Endpoints ---

// export async function createContent(contentData: any) {
//   const response = await axiosInstance.post("/contents", contentData);
//   return response.data;
// }

export async function getLessonContents(lessonId: string) {
  const response = await axiosInstance.get(`/contents/lesson/${lessonId}`);
  return response.data;
}

// --- Language Content Endpoints ---

export async function getLanguageContents(languageId?: string) {
  const response = await axiosInstance.get(`/lessons/contents/language-contents/${languageId}`);
  return response.data;
}

// export async function createLanguageContent(contentData: any) {
//   const response = await axiosInstance.post("/language-contents", contentData);
//   return response.data;
// }