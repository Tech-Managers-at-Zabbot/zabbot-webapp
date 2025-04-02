import React from "react";
// import Image from "next/image";
import Head from "next/head";
import LandingPageNavbar from "@/components/landingPage/landingNav";
import HeroSection from "@/components/landingPage/Hero";
import FeaturesSection from "@/components/landingPage/Features";
// import CarouselSection from "@/components/landingPage/CarouselSection";

const Home = () => {
  return (
    <div className="bg-white">
       <Head>
        <title>Èdèdún - AI Powered Yorùbá Platform</title>
        <meta
          name="description"
          content="Welcome to Zabbot Language Learning Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <link rel="icon" /> */}
      </Head>
      <main className="bg-white">
      <LandingPageNavbar />
      <HeroSection />
      <FeaturesSection />
      </main>
    </div>
  );
}


export default Home;