"use client";
import { CustomSpinner } from "@/components/CustomSpinner";
import Navbar from "@/components/general/Navbar";
import SuccessComponent from "@/components/general/SuccessComponent";
import { usePageLanguage } from "@/contexts/LanguageContext";
import Head from "next/head";

const SuccessPage = () => {
  const { getPageText, isPageLoading: isLanguageLoading } = usePageLanguage(
    "passwordChangeSuccess"
  );

  return (
    <div>
      <Head>
        <title>Zabbot - Success Page</title>
        <meta
          name="description"
          content="Signup to Zabbot Language Learning Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="flex flex-col bg-[#E3F5FF] min-h-screen relative">
        <Navbar />

        <section className="w-full">
          {isLanguageLoading ? (
            <section className="min-h-[80vh] flex justify-center items-center">
              <CustomSpinner spinnerColor="#012657" />
              </section>
          ) : (
            <SuccessComponent
              message={getPageText("password_update_success")}
              title={getPageText("success")}
              buttonText={getPageText("continue")}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default SuccessPage;
