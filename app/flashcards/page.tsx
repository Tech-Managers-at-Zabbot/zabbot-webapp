"use client";
import { Modal } from "@/components/general/Modal";
import { useRouter } from "next/navigation";
import Head from "next/head";
import InAppButton from "@/components/InAppButton";
import { useState } from "react";
import { CustomSpinner } from "@/components/CustomSpinner";
import { useLogUserStreak } from "@/services/generalApi/users/mutation";

const Flashcards = () => {
  const router = useRouter();
  const { mutate: logUserStreak } = useLogUserStreak();

  const [nextPageLoading, setNextPageLoading] = useState(false);

  const handleRedirect = () => {
    setNextPageLoading(true);
    logUserStreak();
    return router.push("/flashcards/flash-cards");
  };

  return (
    <div>
      <Head>
        <title>Zabbot - Flashcards Page</title>
        <meta
          name="description"
          content="Signup to Zabbot Language Learning Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="flex flex-col min-h-screen relative">
        {/* <Navbar /> */}
        <section className="w-full max-w-screen-2xl pt-20">
          <Modal
            size="lg"
            isOpen={true}
            onClose={handleRedirect}
            title="Welcome to Flashcards 🎉"
          >
            <div className="p-6 text-[#252525] flex flex-col gap-4">
              <div>
                Tap the first card to reveal the word, then tap again to flip
                and explore. You’ll see the English meaning, hear the
                pronunciation, and flip to view tones, and translations. Tap
                back and forth as much as you like — listen, repeat, and have
                fun learning! 🎉
              </div>
              <div className="flex items-center justify-center">
                <InAppButton background="#223F1F" onClick={handleRedirect}>
                  <div>
                    {nextPageLoading ? (
                      <div>
                        <CustomSpinner title="loading..." />
                      </div>
                    ) : (
                      <div>Proceed</div>
                    )}
                  </div>
                </InAppButton>
              </div>
            </div>
          </Modal>
        </section>
      </main>
    </div>
  );
};

export default Flashcards;
