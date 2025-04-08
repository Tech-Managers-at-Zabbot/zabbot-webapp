import React from "react";
// import Image from "next/image";
import Head from "next/head";
import LandingPageNavbar from "@/components/landingPage/landingNav";
import HeroSection from "@/components/landingPage/Hero";
import FeaturesSection from "@/components/landingPage/Features";
import WhyZabbotComponent from "@/components/landingPage/WhyZabbot";
import GlobalCommunityComponent from "@/components/landingPage/GlobalCommunity";
import Testimonial from "@/components/landingPage/Testimonial";
// import CarouselSection from "@/components/landingPage/CarouselSection";

const Home = () => {
  return (
    <div className="bg-white">
      <Head>
        <title>Zabbot - AI Powered Language Platform</title>
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
        <WhyZabbotComponent />
        <GlobalCommunityComponent />
        <Testimonial />
      </main>
    </div>
  );
};

export default Home;
