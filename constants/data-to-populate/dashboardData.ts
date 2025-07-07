import { MetricData } from "@/components/dashboard/DashboardMetricCard";
import { LessonProps } from "@/components/dashboard/UserLessonDataComponent";

export const metricsData: MetricData[] = [
  {
    title: 'Total Hours',
    value: '2,420 hrs',
    change: 40,
    changeLabel: 'vs last month',
    graphData: [
      { x: 1, y: 20 },
      { x: 2, y: 25 },
      { x: 3, y: 22 },
      { x: 4, y: 30 },
      { x: 5, y: 35 },
      { x: 6, y: 32 },
      { x: 7, y: 45 },
      { x: 8, y: 42 },
      { x: 9, y: 48 },
      { x: 10, y: 50 }
    ]
  },
  {
    title: 'Completed Courses',
    value: '160',
    change: 40,
    changeLabel: 'vs last month',
    graphData: [
      { x: 1, y: 10 },
      { x: 2, y: 15 },
      { x: 3, y: 12 },
      { x: 4, y: 18 },
      { x: 5, y: 22 },
      { x: 6, y: 25 },
      { x: 7, y: 30 },
      { x: 8, y: 28 },
      { x: 9, y: 35 },
      { x: 10, y: 40 }
    ]
  },
  {
    title: 'Active Learners',
    value: '200K',
    change: 40,
    changeLabel: 'vs last month',
    graphData: [
      { x: 1, y: 100 },
      { x: 2, y: 120 },
      { x: 3, y: 115 },
      { x: 4, y: 140 },
      { x: 5, y: 160 },
      { x: 6, y: 155 },
      { x: 7, y: 180 },
      { x: 8, y: 175 },
      { x: 9, y: 190 },
      { x: 10, y: 200 }
    ]
  }
];


export const lessonProgressData: LessonProps[] = [
  {
    courseImage: "/userDashboard/say-hello.svg",
    courseTitle: "Say Hello",
    courseSummary: "Let's learn how to say HELLO depending on the time of day.",
    courseDuration: 20,
    courseTotalLessons: 28,
    userProgress: 20,
    courseUserLevel: "Explorer"
  },
  {
    courseImage: "/userDashboard/yoruba-alphabet.svg",
    courseTitle: "Yorùbá alphabet",
    courseSummary: "Learning the alphabet sounds is the first step to speaking Yoruba clearly and confidently.",
    courseDuration: 35,
    courseTotalLessons: 50,
    userProgress: 60,
    courseUserLevel: "Builder"
  },
  {
    courseImage: "/userDashboard/calendar.svg",
    courseTitle: "21 Day Challenge",
    courseSummary: "Discover Yorùbá sounds, stories, and traditions in 21 days",
    courseDuration: 50,
    courseTotalLessons: 40,
    userProgress: 10,
    courseUserLevel: "Foundation"
  },
  {
    courseImage: "/userDashboard/hopscotch.svg",
    courseTitle: "Numbers, Time & Daily Life",
    courseSummary: "Counting, Days of the Week, Telling Time, Talking about routines, Songs & Rhymes.",
    courseDuration: 30,
    courseTotalLessons: 35,
    userProgress: 50,
    courseUserLevel: "Builder"
  },
  {
    courseImage: "/userDashboard/children.png",
    courseTitle: "Akede Oro Geesi",
    courseSummary: "Learn common Yoruba greetings used in daily conversations",
    courseDuration: 60,
    courseTotalLessons: 10,
    userProgress: 80,
    courseUserLevel: "Explorer"
  },
  {
    courseImage: "/userDashboard/chair.svg",
    courseTitle: "Owe Ilu Yoruba",
    courseSummary: "Akojopo Konsonati",
    courseDuration: 20,
    courseTotalLessons: 28,
    userProgress: 36,
    courseUserLevel: "Foundation"
  }
]