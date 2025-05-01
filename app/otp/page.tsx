import LandingPageNavbar from "@/components/landingPage/landingNav";
import OtpComponent from "@/components/OtpComponent";
import Head from "next/head";

const Otp = () => {


  return (
    <div>
      <Head>
        <title>Zabbot - OTP Page</title>
        <meta
          name="description"
          content="Signup to Zabbot Language Learning Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="flex flex-col bg-white min-h-screen relative">
      <LandingPageNavbar />
        <section className="hidden md:block w-full pt-20">
        <OtpComponent />
        </section>
      </main>
    </div>
  );
};

export default Otp;
