import ChangePasswordComponent from "@/components/ChangePasswordComponent";
import LandingPageNavbar from "@/components/landingPage/landingNav";
import Head from "next/head";

const ChangePassword = () => {


  return (
    <div>
      <Head>
        <title>Zabbot - ChangePassword Page</title>
        <meta
          name="description"
          content="Signup to Zabbot Language Learning Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="flex flex-col bg-white min-h-screen relative">
      <LandingPageNavbar />
        <section className="hidden md:block w-full pt-20">
        <ChangePasswordComponent />
        </section>
      </main>
    </div>
  );
};

export default ChangePassword;
