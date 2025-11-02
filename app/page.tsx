import React from "react";
import Head from "next/head";
import LandingPageNavbar from "@/components/landingPage/landingNav";
import HeroSection from "@/components/landingPage/Hero";
import ZabbotApproach from "@/components/landingPage/ZabbotApproach";
import FeaturesSection from "@/components/landingPage/Features";
import SubscriptionSection from "@/components/landingPage/SubscriptionSection";
import ZabbotWorkings from "@/components/landingPage/ZabbotWorkings";
import Creators from "@/components/landingPage/Creators";
import LandingPageFooter from "@/components/landingPage/LandingPageFooter";
import NewsLetterComponent from "@/components/landingPage/NewsLetterComponent";
// import QuestionsSection from "@/components/landingPage/QuestionsSection";

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
        <ZabbotApproach />
        <FeaturesSection />
        <SubscriptionSection />
        <ZabbotWorkings />
        <Creators />
        <LandingPageFooter />
        <NewsLetterComponent />
      </main>
    </div>
  );
};

export default Home;
