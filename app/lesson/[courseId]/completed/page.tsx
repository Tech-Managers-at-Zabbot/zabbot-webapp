/* eslint-disable @next/next/no-img-element */
"use client";
import { CustomSpinner } from "@/components/CustomSpinner";
import InAppButton from "@/components/InAppButton";
import LessonCompleteComponent from "@/components/lessons/LessonComplete";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

const Page = () => {

      const router = useRouter();

      const params = useParams();

      const { courseId } = params

      const [ navigationLoading, setNavigationLoading ] = useState(false);

  return (
    <div className="bg-[#fef7d0] flex flex-col justify-center items-center min-h-screen">
      <header className="bg-[url('/lessons/lesson-top.png')] absolute top-0 w-full bg-cover bg-center bg-no-repeat min-h-[200px]"></header>
      <div className="relative mb-4 rounded-xl overflow-hidden">
        <img
          src="/lessons/end-lesson-mascot.png"
          alt="End Lesson Mascot"
          className="w-full h-[100px] md:h-[150px] lg:h-[150px] object-cover object-top rounded-lg"
        />
      </div>
      <LessonCompleteComponent />
      <div className="z-50">
      <InAppButton background="#5A2E10"
      onClick={()=> {setNavigationLoading(true); router.push(`/lesson/${courseId}`)}}
      disabled={navigationLoading}
      disabledColor="#C98F5DCC"
      >
        {navigationLoading ? <CustomSpinner spinnerColor="black" title="Redirecting..."/> : "More Steps"}
      </InAppButton>
      </div>
      <footer className="bg-[url('/lessons/lesson-description-footer.png')] absolute bottom-0 w-full bg-cover bg-center bg-no-repeat min-h-[100px]"></footer>
    </div>
  );
};

export default Page;
