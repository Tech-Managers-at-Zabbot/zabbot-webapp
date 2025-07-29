import { ContentDataType, ContentSourceType, Level } from "./enums";

export interface Language {
  id: string;
  code: string;
  title: string;
  flagIcon?: string;
  isActive?: boolean;
}

export interface ContentFile {
  id?: string;
  contentType: ContentDataType;
  filePath: string;
  file?: File; // For handling file uploads
  description?: string;
}

export interface Content {
  id?: string;
  translation: string;
  contentFiles: ContentFile[];
  sourceType: ContentSourceType;
  ededunPhrases?: EdedunPhrase[];
  customText?: string;
  // mediaDescriptions?: { [key: string]: string };
}

export interface EdedunPhrase {
  id: string;
  yorubaText: string;
  englishTranslation: string;
  audioUrl: string;
  category: string;
}

export interface Lesson {
  id?: string;
  title: string;
  description: string;
  orderNumber: number;
  contents: Content[];
  headlineTag?: string;
  estimatedTime?: number;
  outcomes?: string;
  objectives?: string;
}

export interface Course {
  id?: string;
  title: string;
  description?: string;
  languageId: string;
  level: Level;
  isActive: boolean;
  estimatedDuration?: number;
  totalLessons?: number;
  totalContents?: number;
  thumbnailImage?: string;
   thumbnailFile?: File;
  tags?: string[];
  prerequisites?: string[];
}

export interface CreateCoursePayload {
  course: Omit<Course, 'id'>;
  lessons: Array<Omit<Lesson, 'id' | 'courseId'> & {
    contents: Array<Omit<Content, 'id' | 'lessonId'>>;
  }>;
}