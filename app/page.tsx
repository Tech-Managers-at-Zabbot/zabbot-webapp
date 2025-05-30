import React from "react";
import Head from "next/head";
import LandingPageNavbar from "@/components/landingPage/landingNav";
import HeroSection from "@/components/landingPage/Hero";
import FeaturesSection from "@/components/landingPage/Features";
import WhyZabbotComponent from "@/components/landingPage/WhyZabbot";
import GlobalCommunityComponent from "@/components/landingPage/GlobalCommunity";
import Testimonial from "@/components/landingPage/Testimonial";
import AILanguageComponent from "@/components/landingPage/AILanguageComponent";
import UseCaseComponent from "@/components/landingPage/UseCaseComponent";
import QuestionsSection from "@/components/landingPage/QuestionsSection";

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
      </Head>
      <main className="bg-white">
        <LandingPageNavbar />
        <HeroSection />
        <FeaturesSection />
        <WhyZabbotComponent />
        <GlobalCommunityComponent />
        <Testimonial />
        <AILanguageComponent />
        <UseCaseComponent />
        <QuestionsSection />
      </main>
    </div>
  );
};

export default Home;
