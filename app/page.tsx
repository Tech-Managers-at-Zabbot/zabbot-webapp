"use client";
import React, { useState } from "react";
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
  const [heroLoginRedirect, setHeroLoginRedirect] = useState(false);
  const [heroWatchDemoRedirect, setHeroWatchDemoRedirect] = useState(false);

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
        <div id="navbar">
          <LandingPageNavbar
            heroLoginRedirect={heroLoginRedirect}
            heroWatchDemoRedirect={heroWatchDemoRedirect}
          />
        </div>
        <div id="hero">
          <HeroSection
            setHeroLoginRedirect={setHeroLoginRedirect}
            setHeroWatchDemoRedirect={setHeroWatchDemoRedirect}
          />
        </div>
        <div id="approach">
          <ZabbotApproach />
        </div>
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="pricing">
          <SubscriptionSection />
        </div>
        <div id="how-it-works">
          <ZabbotWorkings />
        </div>
        <div id="team">
          <Creators />
        </div>
        <div id="footer">
          <LandingPageFooter />
        </div>
        <div id="newsletter">
          <NewsLetterComponent />
        </div>
      </main>
    </div>
  );
};

export default Home;
