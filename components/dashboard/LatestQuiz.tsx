/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import UserLessonDataComponent from "./UserLessonDataComponent";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const LatestQuiz = () => {
  const quizzesToMap = [
    {
      thumbnailImage: "/userDashboard/yoruba/journey-colors.png",
      title: "Music Equipments",
      estimatedDuration: 20,
      totalLessons: 10,
      level: "easy",
      description: "Let's learn how to say HELLO depending on the time of day.",
    },
    {
      thumbnailImage: "/userDashboard/yoruba/yoruba-family.png",
      title: "Foods",
      estimatedDuration: 20,
      totalLessons: 10,
      level: "medium",
      description: "Let's learn how to say HELLO depending on the time of day.",
    },
    {
      thumbnailImage: "/userDashboard/yoruba/stop-watch.png",
      title: "People & Places",
      estimatedDuration: 20,
      totalLessons: 10,
      level: "hard",
      description: "Let's learn how to say HELLO depending on the time of day.",
    },
    {
      thumbnailImage: "/userDashboard/yoruba/golden-heart.png",
      title: "History & Folklores",
      estimatedDuration: 20,
      totalLessons: 10,
      level: "medium",
    },
    {
      thumbnailImage: "/userDashboard/yoruba/big-baby.png",
      title: "Emotions & Expressions",
      estimatedDuration: 20,
      totalLessons: 10,
      level: "easy",
    },
    {
      thumbnailImage: "/userDashboard/yoruba/food.png",
      title: "Food & Market Culture",
      estimatedDuration: 20,
      totalLessons: 10,
      level: "medium",
      description: "Let's learn how to say HELLO depending on the time of day.",
    },
    {
      thumbnailImage: "/userDashboard/yoruba/mat.png",
      title: "Clothing & Self-Presentation",
      estimatedDuration: 20,
      totalLessons: 10,
      level: "easy",
      description: "Let's learn how to say HELLO depending on the time of day.",
    },
    {
      thumbnailImage: "/userDashboard/yoruba/chores.png",
      title: "Home & Housing",
      estimatedDuration: 20,
      totalLessons: 10,
      level: "medium",
      description: "Let's learn how to say HELLO depending on the time of day.",
    },
    {
      thumbnailImage: "/userDashboard/yoruba/health.png",
      title: "Health & Well-being",
      estimatedDuration: 20,
      totalLessons: 10,
      level: "hard",
      description: "Let's learn how to say HELLO depending on the time of day.",
    },
    {
      thumbnailImage: "/userDashboard/yoruba/map-of-nigeria.png",
      title: "Travel & Places",
      estimatedDuration: 20,
      totalLessons: 10,
      level: "medium",
      description: "Let's learn how to say HELLO depending on the time of day.",
    },
    {
      thumbnailImage: "/userDashboard/yoruba/travel.png",
      title: "Transport & Getting Around",
      estimatedDuration: 20,
      totalLessons: 10,
      level: "hard",
      description: "Let's learn how to say HELLO depending on the time of day.",
    },
    {
      thumbnailImage: "/userDashboard/yoruba/sunset.svg",
      title: "Weather, Nature & Spirituality",
      estimatedDuration: 20,
      totalLessons: 10,
      level: "medium",
      description: "Let's learn how to say HELLO depending on the time of day.",
    },
    {
      thumbnailImage: "/userDashboard/yoruba/reading.svg",
      title: "Work, School & Aspirations",
      estimatedDuration: 20,
      totalLessons: 10,
      level: "easy",
      description: "Let's learn how to say HELLO depending on the time of day.",
    },
    {
      thumbnailImage: "/userDashboard/yoruba/dialogue-art.png",
      title: "Conflict Resolution & Apologies",
      estimatedDuration: 20,
      totalLessons: 10,
      level: "medium",
      description: "Let's learn how to say HELLO depending on the time of day.",
    },
    {
      thumbnailImage: "/userDashboard/yoruba/culture.png",
      title: "Proverbs & Everyday Wisdom",
      estimatedDuration: 20,
      totalLessons: 10,
      level: "hard",
      description: "Let's learn how to say HELLO depending on the time of day.",
    },
    {
      thumbnailImage: "/userDashboard/yoruba/talking-drums.png",
      title: "Music, Dance & Pop Culture",
      estimatedDuration: 20,
      totalLessons: 10,
      level: "easy",
      description: "Let's learn how to say HELLO depending on the time of day.",
    },
    {
      thumbnailImage: "/userDashboard/yoruba/festival-drums.png",
      title: "Festivals & Traditions",
      estimatedDuration: 20,
      totalLessons: 10,
      level: "hard",
      description: "Let's learn how to say HELLO depending on the time of day.",
    },
    {
      thumbnailImage: "/userDashboard/yoruba/customer-care.png",
      title: "Technology & Modern Life",
      estimatedDuration: 20,
      totalLessons: 10,
      level: "hard",
      description: "Let's learn how to say HELLO depending on the time of day.",
    },
    {
      thumbnailImage: "/userDashboard/yoruba/nigeria-flag-and-woman.png",
      title: "News, Politics & Community Issues",
      estimatedDuration: 20,
      totalLessons: 10,
      level: "easy",
      description: "Let's learn how to say HELLO depending on the time of day.",
    },
  ];

  return (
    <div className="flex gap-[30px]">
      <section className="flex-1 xl:max-w-[100%] w-full">
        <UserLessonDataComponent
          title={"Latest Quiz"}
          subtitle={"Top Yorùbá courses learners love!"}
          maxWidth="100%"
          showViewQuizBtn={true}
        >
          <section className="flex gap-[15px] min-w-max">
            {quizzesToMap.map(
              (lessonProgressData: Record<string, any>, index: number) => (
                <div key={index}>
                  <QuizCard data={lessonProgressData} isClickable={true} />
                </div>
              )
            )}
          </section>
        </UserLessonDataComponent>
      </section>
    </div>
  );
};

export const QuizCard = ({
  data,
  isClickable = false,
}: {
  data: any;
  isClickable?: boolean;
}) => {
  //   const router = useRouter();
  //   const { setLoading } = useLoading();

  return (
    <div
      // className="bg-white hover:cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex flex-col relative gap-[20px] w-full max-w-[278px] min-w-[200px] h-[325px] rounded-lg border border-[#E1E1E1] flex-shrink-0 mx-auto"
      className={`flex flex-col bg-white relative gap-[20px] w-full h-[300px] max-w-[380px] min-w-[350px] rounded-[14px] border border-[#666666] ${
        isClickable
          ? "hover:cursor-pointer transform hover:scale-105 hover:shadow-xl"
          : "opacity-60 cursor-not-allowed"
      }`}
      style={{ fontFamily: "Lexend" }}
      //   onClick={() => {
      //     if(isClickable){
      //     router.push(`/lesson/${data?.id}`);
      //     setLoading(true);
      //     }
      //   }}
    >
      <section className="w-full">
        <div className="relative w-full h-[170px]">
          <Image
            src={data?.thumbnailImage || "/lessons/yoruba.avif"}
            alt="An image of a boy prostrating before an elderly woman in greeting"
            fill
            priority
            className="object-cover object-top"
          />
        </div>
      </section>

      <div className="absolute top-36 right-5 flex-shrink-0 rounded-full bg-white">
        <IoIosArrowDroprightCircle size={40} color="#207EC5" fill="#207EC5" />
      </div>

      <section className="absolute text-[#FFFF] top-30 flex flex-col px-[10px] font-[500] text-[11px] sm:text-[12px] leading-[133.333%]">
        <div className="flex">
          <div
            className={`px-[12px] py-[6px] rounded-full`}
            style={{
              background:
                data.level === "easy"
                  ? "#029856"
                  : data.level === "medium"
                  ? "#EAB308"
                  : "#EF4444",
            }}
          >
            {data?.level}
          </div>
        </div>
        {/* <div>
          <h3 className="font-[600] text-white text-[12px] sm:text-[16px] leading-[150%]">
            {data?.title?.length > 50
              ? data?.title.slice(0, 50) + "..."
              : data?.title}
          </h3>
        </div> */}
      </section>

      <section className="flex flex-col gap-[16px] justify-between p-[10px] flex-1">
        <div className="flex flex-col gap-[8px]">
          <div>
            <h3 className="font-[600] text-[#162B6E] text-[12px] sm:text-[16px] leading-[150%]">
              {data?.title?.length > 50
                ? data?.title.slice(0, 50) + "..."
                : data?.title}
            </h3>
          </div>
          <div className="font-light text-[#666666] text-[11px] sm:text-[12px] leading-[100%]">
            {data?.description?.length > 50
              ? data?.description.slice(0, 50) + "..."
              : data?.description}
          </div>
        </div>

        <div className="flex flex-col gap-[4px]">
          <div className="font-medium text-[11px] sm:text-[12px] flex justify-between leading-[145%] text-[#1D2739]">
            <span>{data?.estimatedDuration} min</span>
            <span>
              {data?.totalLessons}{" "}
              {data?.totalLessons === 1 ? "lesson" : "lessons"}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LatestQuiz;
