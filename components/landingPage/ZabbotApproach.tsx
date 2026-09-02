/* eslint-disable @next/next/no-img-element */
import React from "react";
import { X, CheckCircle } from "lucide-react";

const ZabbotApproach = () => {
  return (
    <div
      className="min-h-screen bg-white flex justify-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[112px] py-12 sm:py-16 md:py-20 lg:pt-[87px] lg:pb-[72px]"
      style={{ fontFamily: "Lexend, sans-serif" }}
    >
      <div className="w-full max-w-7xl">
        <section>
          <h1 className="text-[#101828] text-center text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-medium leading-tight sm:leading-snug md:leading-[55px] px-4">
            Heritage Languages are fading because modern tools ignore tonal
            accuracy and cultural context.
          </h1>
        </section>
        <section>
          <div className="mt-8 sm:mt-10 flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 w-full justify-center items-stretch">
            <ApproachCard
              title={"Generic Language Apps"}
              topIcon={
                <X
                  size={32}
                  className="sm:w-10 sm:h-10"
                  color="#FFFFFF"
                  style={{
                    backgroundColor: "#FB2C36",
                    borderRadius: "50%",
                    padding: "6px",
                  }}
                />
              }
              background={"#F3F4F6"}
              border={"1px solid #D1D5DC"}
            >
              <div className="text-[#4A5565] text-sm sm:text-base">
                <ul className="list-disc pl-5 space-y-3 sm:space-y-4">
                  <li className="marker:text-[#FB2C36]">
                    One-size-fits-all lessons with little or no cultural
                    context.
                  </li>
                  <li className="marker:text-[#FB2C36]">
                    Focus on memorizing words & phrases, not real communication.
                  </li>
                  <li className="marker:text-[#FB2C36]">
                    Fails to handle tonal accuracy or native pronunciation
                    nuances.
                  </li>
                  <li className="marker:text-[#FB2C36]">
                    Learners feel disconnected from their cultural identity.
                  </li>
                </ul>
              </div>
            </ApproachCard>
            <ApproachCard
              title={"Zabbot's Approach"}
              topIcon={
                <CheckCircle
                  size={32}
                  className="sm:w-10 sm:h-10"
                  color="#FFFFFF"
                  fill="#00C950"
                  style={{
                    backgroundColor: "#00C950",
                    borderRadius: "50%",
                  }}
                />
              }
              background={
                "linear-gradient(135deg, #E3F5FF 0%, rgba(166, 223, 255, 0.50) 100%)"
              }
              border={"3px solid #A6DFFF"}
              borderClass="lg:border-[5px]"
              useCustomList={true}
            >
              <div className="text-[#364153] text-sm sm:text-base">
                <style
                  dangerouslySetInnerHTML={{
                    __html: `
                    .list-green-tick {
                      list-style: none;
                      padding-left: 0;
                    }
                    .list-green-tick li {
                      background-image: url('/landingPage/green-tick.svg');
                      background-repeat: no-repeat;
                      background-position: 0 0.25em;
                      background-size: 1.2em;
                      padding-left: 2em;
                    }
                  `,
                  }}
                />
                <ul className="list-green-tick space-y-3 sm:space-y-4">
                  <li>
                    Built for heritage learners, blends language & culture.
                  </li>
                  <li>
                    Includes AI Conversational Tutor for real-time practice.
                  </li>
                  <li>
                    Provides Pronunciation Feedback that listens & corrects
                    tone.
                  </li>
                  <li>
                    Rooted in authentic expression, not just literal
                    translation.
                  </li>
                </ul>
              </div>
            </ApproachCard>
          </div>
        </section>

        <section>
          <BlendingCard />
        </section>
      </div>
    </div>
  );
};

interface ApproachCardProps {
  title: string;
  topIcon: React.ReactNode;
  children: React.ReactNode;
  background: string;
  border: string;
  borderClass?: string;
  useCustomList?: boolean;
}

const ApproachCard: React.FC<ApproachCardProps> = ({
  background,
  border,
  borderClass = "",
  title,
  topIcon,
  children,
}) => {
  return (
    <div className="relative flex-1 w-full lg:min-w-0">
      <div
        className={`rounded-2xl lg:rounded-[16px] w-full min-h-[240px] p-6 sm:p-8 lg:p-10 flex flex-col gap-4 ${borderClass}`}
        style={{
          background,
          border,
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -4px rgba(0, 0, 0, 0.10)",
        }}
      >
        {/* Top section with icon and title */}
        <div className="absolute -top-4 -right-2 sm:-top-5 sm:-right-3">
          {topIcon}
        </div>
        <div className="flex pr-8 sm:pr-12">
          <h1 className="text-[#101828] text-xl sm:text-2xl lg:text-[24px] font-medium leading-tight sm:leading-[28px]">
            {title}
          </h1>
        </div>

        {/* Content section */}
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </div>
  );
};

const BlendingCard = () => {
  return (
    <div className="w-full relative flex justify-center mt-12 sm:mt-16 lg:mt-20 p-6 sm:p-8 lg:p-10 rounded-2xl lg:rounded-3xl bg-[#E9F7FF] overflow-hidden">
      <div className="absolute top-0 right-0">
        <img
          src="/landingPage/topRight-blending-semi.svg"
          alt="Zabbot Approach Illustration"
          className="w-32 h-auto sm:w-48 md:w-64 lg:w-80 xl:w-[600px]"
        />
      </div>
      <h1 className="text-[#162C6F] text-center text-lg sm:text-xl md:text-2xl lg:text-[28px] xl:text-[32px] font-normal leading-snug sm:leading-relaxed lg:leading-[42px] w-full sm:w-[95%] md:w-[90%] z-10 relative px-2 sm:px-4">
        Zabbot blends AI, storytelling, and culture to help you learn, speak, and connect through language.
      </h1>
      <div className="absolute bottom-0 left-0">
        <img
          src="/landingPage/bottomLeft-blending-semi.svg"
          alt="Zabbot Approach Illustration"
          className="w-32 h-auto sm:w-48 md:w-64 lg:w-80 xl:w-[600px]"
        />
      </div>
    </div>
  );
};

export default ZabbotApproach;
