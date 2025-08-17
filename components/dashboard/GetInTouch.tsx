import React from "react";
import { RxInstagramLogo } from "react-icons/rx";
import { BsLinkedin } from "react-icons/bs";
import { FaSlack } from "react-icons/fa";
import { useTheme } from "@/contexts/ThemeProvider";
import Link from "next/link";
import { useLoading } from "@/contexts/LoadingProvider";
import { usePageLanguage } from "@/contexts/LanguageContext";

const GetInTouch = ({ isDark }: { isDark?: boolean }) => {
  const { theme } = useTheme();
  const { setLoading } = useLoading();

  const { getPageText } =
        usePageLanguage("userDashboard");

  return (
    <div
      className={`${theme === "dark" || isDark ? "bg-[#012657]" : "bg-[#dff9fb]"}`}
      style={{ fontFamily: "Lexend" }}
    >
      <div className="flex-shrink-0 pb-12 flex gap-[20px] flex-col justify-center items-center">
        <section className="flex flex-col items-center gap-[10px]">
          <div
            className={`font-medium text-[16px] ${
              theme === "dark" || isDark ? "text-[#F0F0F0]" : "text-[#343434]"
            } leading-[125%] whitespace-nowrap flex-shrink-0`}
          >
            {getPageText("copyright")}
          </div>
          <div
            className={`font-medium text-[14px] ${
              theme === "dark" || isDark ? "text-[#F0F0F0]" : "text-[#343434]"
            } leading-[125%] whitespace-nowrap flex-shrink-0`}
          >
            {getPageText("trademark")}
          </div>
          <div
            className={`font-medium text-[16px] ${
              theme === "dark" || isDark ? "text-[#F0F0F0]" : "text-[#343434]"
            } leading-[125%] whitespace-nowrap flex-shrink-0`}
          >
            <Link onClick={() => setLoading(true)} href="/terms-of-service">
              <span className="underline">{getPageText("terms")}</span>
            </Link>
             · 
            <Link onClick={() => setLoading(true)} href="/terms-of-service">
              <span className="underline">{getPageText("privacy")}</span>
            </Link>
          </div>
        </section>

        <section className="flex gap-[22px] justify-center items-center">
          <div
            className={`font-medium text-[16px] ${
              theme === "dark" || isDark ? "text-[#F0F0F0]" : "text-[#343434]"
            } leading-[100%] whitespace-nowrap flex-shrink-0`}
          >
            {getPageText("get_in_touch")}
          </div>

          <div className="flex justify-center items-center gap-6">
            <div
              className={`flex items-center gap-2 rounded-full bg-[#5EB3D2] p-[10px] ${
                theme === "dark" || isDark ? "text-white" : "text-[#012657]"
              } text-2xl`}
            >
              <a
                href="https://www.linkedin.com/company/zabbot"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  theme === "dark" || isDark ? "text-white" : "text-[#012657]"
                } text-2xl`}
              >
                <BsLinkedin size={30} color={"#FFFFFF"} />
              </a>
            </div>

            <div
              className={`flex items-center gap-2 rounded-full bg-[#5EB3D2] p-[10px] ${
                theme === "dark" || isDark ? "text-white" : "text-[#012657]"
              } text-2xl`}
            >
              <a
                href="https://www.instagram.com/zabbot_heritage?igsh=ZWlsejkwOGlvanhi"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  theme === "dark" || isDark ? "text-white" : "text-[#012657]"
                } text-2xl`}
              >
                <RxInstagramLogo size={30} color={"#FFFFFF"} />
              </a>
            </div>
            <div
              className={`flex items-center gap-2 rounded-full bg-[#5EB3D2] p-[10px] ${
                theme === "dark" ? "text-white" : "text-[#012657]"
              } text-2xl`}
            >
              <a
                href="https://zabbotllc.slack.com/join/shared_invite/zt-39zw6ba7k-EjhqsNxjdo8qF1K8Dddqug"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  theme === "dark" || isDark ? "text-white" : "text-[#012657]"
                } text-2xl`}
              >
                <FaSlack size={30} color={"#FFFFFF"} />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GetInTouch;
