"use client";
import React, { useState } from "react";
import { motion, Variants, Transition } from "framer-motion";
import ColouredButton from "../ColouredButton";
import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import WatchDemoModal from "./WatchDemoModal";
import { useAlert } from "next-alert";
import { useSubscribeUser } from "@/services/newsletterSub/mutation";
import { appColors } from "@/constants/colors";

const NewsLetterComponent = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { addAlert } = useAlert();
  const { mutate: subscribeUser, isPending: isSubscribeLoading } = useSubscribeUser();

  // ✅ Type-safe spring animation variant
  const bounceIn: Variants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const, // ✅ explicit literal
        stiffness: 300,
        damping: 12,
        delay: 0.2,
      },
    },
  };

  const handleWatchDemoClick = () => {
    setIsDemoOpen(true);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError("Email is required.");
      return;
    }
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!valid) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");

    try {
      subscribeUser(
        {
          email: trimmed.toLowerCase(),
        },
        {
          onSuccess: () => {

            addAlert(
              "Success",
              "Newsletter subscription successful",
              "success"
            );
            setEmail('');
          },
          onError: (error) => {

            return addAlert(
              "Error",
              error?.response?.data?.message || "Newsletter subscription unsuccessful",
              "error"
            );
          },
        }
      );
    } catch (error) {
      console.log("Newsletter subscription:", error);
      addAlert("error", "Login failed. Please try again.", "error");
    } finally {
      console.log("Newsletter subscription error:",);
    }
  };

  // ✅ Floating loop bounce animation (type-safe)
  const floatBounce = {
    y: [0, -5, 0],
    transition: {
      duration: 2,
      ease: "easeInOut" as const,
      repeat: Infinity,
      repeatType: "mirror" as const, // ✅ must be a literal of RepeatType
    } satisfies Transition, // ✅ type assertion ensures valid shape
  };

  return (
    <div style={{ fontFamily: "Lexend" }}>
      <main className="flex flex-col justify-center items-center gap-10 xl:gap-24 py-12 xl:py-32 px-4 sm:px-8 md:px-16 lg:px-28 bg-[url('/landingPage/landing-newsletter-background.svg')] bg-no-repeat bg-cover min-h-screen">
        {/* Section 1 - Headline */}
        <section className="text-center px-2 sm:px-4 z-10">
          <div className="flex flex-col gap-3 sm:gap-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-[400] leading-tight md:leading-[64px] text-white">
              Ready to <span className="text-[#F9C10F]">reconnect</span> with your heritage?
            </h1>
            <p className="font-[400] leading-relaxed text-base sm:text-lg md:text-xl text-[#E3F5FF]">
              Join learners speaking, learning, and celebrating language together.
            </p>
          </div>
        </section>

        {/* Section 2 - Buttons */}
        <motion.section
          className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8"
          variants={bounceIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Start Yorùbá Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={floatBounce}
          >
            <Link href="/login">
              <ColouredButton
                paddingBottom="10px"
                paddingLeft="10px"
                paddingRight="10px"
                paddingTop="10px"
                backgroundColor="#F9C10F"
                color="#122158"
                borderRadius="30px"
              >
                <main className="flex gap-2 sm:gap-3 items-center justify-center">
                  <BsStars size={20} />
                  <div className="font-[600] text-sm sm:text-base md:text-lg">
                    Start Yorùbá
                  </div>
                  <FaArrowRightLong size={20} />
                </main>
              </ColouredButton>
            </Link>
          </motion.div>

          {/* Watch Demo Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={floatBounce}
            transition={{ delay: 0.4 }}
          >
            <ColouredButton
              paddingBottom="10px"
              paddingLeft="10px"
              paddingRight="10px"
              paddingTop="10px"
              backgroundColor="#FFFFFF"
              color="#122158"
              borderRadius="30px"
              onClick={handleWatchDemoClick}
            >
              <main className="flex gap-2 sm:gap-3 items-center justify-center">
                <div className="font-[600] text-sm sm:text-base md:text-lg">
                  Watch Demo
                </div>
              </main>
            </ColouredButton>
          </motion.div>
        </motion.section>

        {/* Section 3 - Newsletter Signup */}
        <section className="w-full flex justify-center items-center px-2 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="flex flex-col items-center w-full sm:w-[90%] md:w-[90%] lg:w-[70%] xl:w-[60%] shadow-[0_41.841px_83.682px_-20.084px_rgba(0,0,0,0.25)] py-10 sm:py-12 md:py-16 px-6 sm:px-10 md:px-16 gap-6 sm:gap-8"
            style={{
              border: "2.678px solid rgba(255, 255, 255, 0.20)",
              borderRadius: "40.167px",
            }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
              <MdOutlineMailOutline size={40} color="#F9C10F" />
              <h1 className="font-[400] text-xl md:text-xl leading-tight text-white">
                Get Cultural Content & Updates
              </h1>
            </div>

            <form
              onSubmit={handleSubscribe}
              noValidate
              className="flex flex-col w-full gap-2"
            >
              <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-6 justify-center items-start">
                <div className="flex flex-col w-full sm:flex-1 gap-1">
                  <div
                    className={`flex items-center border rounded-xl px-4 py-3 bg-white ${emailError ? "border-red-400" : "border-white/50"
                      }`}
                  >
                    <FiMail className="text-[#99A1AF] text-xl mr-3 flex-shrink-0" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      className="w-full font-[400] bg-transparent text-[#6A7282] focus:outline-none text-base sm:text-lg"
                    />
                  </div>
                  {emailError && (
                    <p className="text-red-400 text-sm pl-1">{emailError}</p>
                  )}
                </div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={floatBounce}
                  transition={{ delay: 0.6 }}
                  className="w-full sm:w-auto"
                >
                  <ColouredButton
                    paddingBottom="8px"
                    paddingLeft="12px"
                    paddingRight="12px"
                    paddingTop="8px"
                    backgroundColor="#F9C10F"
                    color="#122158"
                    borderRadius="20px"
                    height="auto"
                    width="100%"
                    boxShadow="0 16.736px 25.105px -5.021px rgba(0, 0, 0, 0.10), 0 6.695px 10.042px -6.695px rgba(0, 0, 0, 0.10)"
                    type="submit"
                  >
                    <main className="flex items-center justify-center py-2">
                      <div
                        className="font-[400] text-base sm:text-lg md:text-xl leading-[145%]"
                        style={{
                          textDecoration: 'none',
                          color: isSubscribeLoading ? '#9CA3AF' : appColors.normalBlue,
                          pointerEvents: isSubscribeLoading ? 'none' : 'auto',
                        }}
                      >
                        Subscribe
                      </div>
                    </main>
                  </ColouredButton>
                </motion.div>
              </div>
            </form>

            <p className="font-[400] text-base sm:text-lg md:text-xl text-center text-white leading-relaxed">
              Learnings, riddles, cultural stories, prizes and updates.
            </p>
          </motion.div>

          <WatchDemoModal
            isOpen={isDemoOpen}
            onClose={() => setIsDemoOpen(false)}
            youtubeUrl="https://youtu.be/mWBvbeLHVYs?si=MsZELQyh45RLpDT4"
          />
        </section>
      </main>
    </div >
  );
};

export default NewsLetterComponent;
