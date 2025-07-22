/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";

const Loader = () => {
  const [isDark, setIsDark] = useState(false);
  const [zabbotLogo, setZabbotLogo] = useState("/general/zabbot-logo-blue.png")

useEffect(() => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const isDarkTime = hours >= 18 || hours < 6;
  setIsDark(isDarkTime);
  setZabbotLogo(isDarkTime ? "/general/zabbot-logo-white.png" : "/general/zabbot-logo-blue.png");
}, []);


  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center w-full min-h-screen overflow-hidden z-[9999] transition-colors opacity-96 ${
        isDark ? "bg-[#012657]" : "bg-[#dff9fb]"
      }`}
      style={{ fontFamily: "Lexend" }}
    >
      <div className="relative w-80 h-80 mb-6">
        <img
          src="/general/loader-parrot.gif"
          alt="Zabbot is loading"
          className="w-[1000px] object-cover"
        />
        <div className="absolute -bottom-6 left-0 right-0 text-center">
          <img
            src={zabbotLogo}
            alt="Zabbot is loading"
            className="w-[1000px] animate-pulse object-cover"
          />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h2 className={`text-2xl font-bold ${
        isDark ? "text-white" : "text-[#162B6E]"
      }`}>
          Zabbot is Loading...
        </h2>
        <p className={`${
        isDark ? "text-white" : "text-[#162B6E]"
      }`}>Gathering your language experience…</p>
      </div>
    </div>
  );
};

export default Loader;
