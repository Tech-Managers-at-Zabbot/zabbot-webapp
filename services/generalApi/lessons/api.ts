/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateCoursePayload } from "@/types/interfaces";
import axiosInstance from "../../axiosInstance";

// --- Course Endpoints ---

export async function createCourse(courseData: CreateCoursePayload) {
  const response = await axiosInstance.post("/courses", courseData);
  return response.data;
}

export async function deleteCourse(courseId: string) {
  const response = await axiosInstance.delete(`/lessons/courses/${courseId}`);
  return response.data;
}

export async function updateCourse(
  courseId: string | any,
  updateData: Record<string, any>,
) {
  if (!courseId) return;
  const response = await axiosInstance.put(
    `/lessons/courses/${courseId}`,
    updateData
  );
  return response.data;
}

export async function createCourseWithLessons(
  courseData: any,
  languageId: string
) {
  const response = await axiosInstance.post(
    `/lessons/courses/course-with-lesson/${languageId}`,
    courseData
  );
  return response.data;
}

export async function getCourses(
  isActive = true,
  languageId: string,
  isAdmin = false
) {
  const response = await axiosInstance.get(
    `/lessons/courses/${languageId}?isActive=${isActive}&isAdmin=${isAdmin}`
  );
  return response.data;
}

export async function getCourseWithLessons(languageId: string) {
  const response = await axiosInstance.get(
    `/lessons/courses/get-course-with-lesson/${languageId}`
  );
  return response.data;
}

export async function getLessonWithContents(id: string | any) {
  const response = await axiosInstance.get(
    `/lessons/lessons/lesson-with-contents/${id}`
  );
  return response.data;
}

export async function getLanguageLessons(languageId?: string) {
  const response = await axiosInstance.get(
    `/lessons/lessons/language-lessons/${languageId}`
  );
  return response.data;
}

export async function getCourse(id: string, projections?: string) {
  const params: any = {};
  if (projections && projections.length > 0) {
    params.projections = projections;
  }
  const response = await axiosInstance.get(
    `/lessons/courses/single-course/${id}`,
    {
      params: Object.keys(params).length > 0 ? params : undefined,
    }
  );

  return response.data;
}

export async function addQuiz(payload: Record<string, any>) {
  const response = await axiosInstance.post(
    `/lessons/quizzes/create-quiz`,
    payload
  );
  return response.data;
}

export async function getCourseQuizzes(courseId: string) {
  const response = await axiosInstance.get(`/lessons/quizzes/${courseId}`);
  return response.data;
}

export async function addUserCourse(
  languageId: string,
  courseId: string | any,
  userCourseData?: Record<string, any>,
) {
  const response = await axiosInstance.post(
    `/lessons/courses/add-user-course/${languageId}/${courseId}`,
    userCourseData
  );
  return response.data;
}

export async function getUserCourse(
  languageId: string,
  courseId: string | any,
  lastLessonId: string | any
) {
  const response = await axiosInstance.get(
    `/lessons/courses/user-course/${languageId}/${courseId}?lastLessonId=${lastLessonId}`
  );
  return response.data;
}

export async function updateUserCourse(
  courseId: string | any,
  updateData: Record<string, any>,
  languageId?: string
) {
  if (!courseId) return;
  const response = await axiosInstance.put(
    `/lessons/courses/update-user-course/${courseId}`,
    updateData
  );
  return response.data;
}

export async function getUserCompletedCourses(
  languageId: string,
  countOnly: boolean = false
) {
  const response = await axiosInstance.get(
    `/lessons/courses/user-completed-courses/${languageId}?countOnly=${countOnly}`
  );
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
  const response = await axiosInstance.post("/lessons/lessons", lessonData);
  return response.data;
}

export async function getCourseLessons(courseId: string) {
  const response = await axiosInstance.get(
    `lessons/lessons/course-lessons/${courseId}`
  );
  return response.data;
}

// Get all user lessons: GET / lessons / user - lessons
export async function getUserLessons() {
  const response = await axiosInstance.get("/lessons/user-lessons");
  return response.data;
}

// Get all lessons: GET / lessons 
export async function getAllLessons() {
  const response = await axiosInstance.get("/lessons/lessons");
  return response.data;
}

// Get a single user lesson GET /lessons/user-lessons/{{lessonId}}
export async function getUserLesson(lessonId: string) {
  const response = await axiosInstance.get(`/lessons/user-lessons/${lessonId}`);
  return response.data;
}

// Add a user lesson POST /lessons/user-lessons
// const lessonData = ⁠{
//   "courseId": string,
//   "lessonId": string,
//   "languageId": "language-123",
//   "percentageCompletion": 25,
//   "score": 60,
//   "isCompleted": false,
//   "startedAt": "2026-06-29T10:00:00.000Z"
// } ⁠

export async function addUserLesson(lessonData: any) {
  const response = await axiosInstance.post("/lessons/user-lessons", lessonData);
  return response.data;
}

// Update user lesson: PUT /lessons/user-lessons
export async function updateUserLesson(lessonId: string, updateData: any) {
  const response = await axiosInstance.put(
    `/lessons/user-lessons/${lessonId}`,
    updateData
  );
  return response.data;
}

// Delete user lesson: DELETE /lessons/user-lessons/{{userId}}/{{lessonId}}
export async function deleteUserLesson(userId: string, lessonId: string) {
  if (!lessonId) return;
  const response = await axiosInstance.delete(`/lessons/user-lessons/${userId}/${lessonId}`);
  return response.data;
}

// --- Content Endpoints ---

export async function getLessonContents(lessonId: string) {
  const response = await axiosInstance.get(`/contents/lesson/${lessonId}`);
  return response.data;
}

// --- Language Content Endpoints ---

export async function getLanguageContents(languageId?: string) {
  const response = await axiosInstance.get(
    `/lessons/contents/language-contents/${languageId}`
  );
  return response.data;
}

export async function updateCourseImage(
  courseId: string,
  updateData: FormData
) {
  const response = await axiosInstance.put(
    `/lessons/courses/change-course-image/${courseId}`,
    updateData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
  );
  return response.data;
}

export async function updateLessonImage(
  lessonId: string,
  updateData: FormData
) {
  const response = await axiosInstance.put(
    `/lessons/lessons/change-lesson-image/${lessonId}`,
    updateData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
  );
  return response.data;
}

export async function updateLessonById(
  lessonId: string,
  updateData: any
) {
  const response = await axiosInstance.put(
    `/lessons/lessons/${lessonId}`,
    updateData
  );
  return response.data;
}

export async function deleteLessonById(
  lessonId: string,
) {
  const response = await axiosInstance.delete(
    `/lessons/lessons/${lessonId}`,
  );
  return response.data;
}


export async function deleteQuizById(
  quizId: string,
) {
  const response = await axiosInstance.delete(
    `/lessons/quizzes/${quizId}`,
  );
  return response.data;
}

export async function updateQuizById(
  quizId: string,
  updateData: Record<string, any>,
) {
  const response = await axiosInstance.put(
    `/lessons/quizzes/${quizId}`,
    updateData
  );
  return response.data;
}

export async function createContent(
  payload: Record<string, any>,
) {
  const response = await axiosInstance.post(
    `/lessons/contents`,
    payload
  );
  return response.data;
}

export async function updateContentById(
  contentId: string,
  updateData: Record<string, any>,
) {
  const response = await axiosInstance.put(
    `/lessons/contents/${contentId}`,
    updateData
  );
  return response.data;
}

export async function deleteContentById(
  contentId: string,
) {
  const response = await axiosInstance.delete(
    `/lessons/contents/${contentId}`,
  );
  return response.data;
}

export async function addSingleContentFile(
  data: { filePath: string; contentType: string; description?: string, contentId: string },
) {
  const response = await axiosInstance.post(
    `/lessons/contents/add-file`,
    data
  );
  return response.data;
}

export async function addContentFile(
  fileId: string,
  data: { filePath: string; contentType: string; description?: string },
) {
  const response = await axiosInstance.put(
    `/lessons/contents/file/${fileId}`,
    data
  );
  return response.data;
}

export async function deleteContentFile(
  contentId: string,
  fileId: string,
) {
  const response = await axiosInstance.delete(
    `/lessons/contents/file/${fileId}`,
  );
  return response.data;
}