import React from "react";
import { RxInstagramLogo } from "react-icons/rx";
import { BsLinkedin } from "react-icons/bs";
import { FaSlack } from "react-icons/fa";
import { useTheme } from "@/contexts/ThemeProvider";

const GetInTouch = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`${theme === "dark" ? "bg-[#012657]" : "bg-[#dff9fb]"}`}
      style={{ fontFamily: "Lexend" }}
    >
      <div className="flex-shrink-0 pb-12 flex flex-col justify-center items-center">
        <div
          className={`font-medium text-[32px] ${
            theme === "dark" ? "text-white" : "text-[#012657]"
          } leading-[49px] whitespace-nowrap flex-shrink-0`}
        >
          Get in touch
        </div>

        <div className="flex justify-center items-center gap-6 mt-4">
          <div
            className={`flex items-center gap-2 ${
              theme === "dark" ? "text-white" : "text-[#012657]"
            } text-2xl`}
          >
            <a
              href="https://www.linkedin.com/company/zabbot"
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                theme === "dark" ? "text-white" : "text-[#012657]"
              } text-2xl`}
            >
              <BsLinkedin color={theme === "dark" ? "#FFFFFF" : "#012657"} size={42} />
            </a>
          </div>

          <div
            className={`flex items-center gap-2 ${
              theme === "dark" ? "text-white" : "text-[#012657]"
            } text-2xl`}
          >
            <a
              href="https://www.instagram.com/zabbot_heritage?igsh=ZWlsejkwOGlvanhi"
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                theme === "dark" ? "text-white" : "text-[#012657]"
              } text-2xl`}
            >
              <RxInstagramLogo size={42} color={theme === "dark" ? "#FFFFFF" : "#012657"} />
            </a>
          </div>
          <div
            className={`flex items-center gap-2 ${
              theme === "dark" ? "text-white" : "text-[#012657]"
            } text-2xl`}
          >
            <a
              href="https://zabbotllc.slack.com/join/shared_invite/zt-39zw6ba7k-EjhqsNxjdo8qF1K8Dddqug"
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                theme === "dark" ? "text-white" : "text-[#012657]"
              } text-2xl`}
            >
              <FaSlack size={42} color={theme === "dark" ? "#FFFFFF" : "#012657"} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
