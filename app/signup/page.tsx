import AuthBanner from "@/components/authPage/AuthBanner";
import RegisterAuth from "@/components/authPage/RegisterAuth";
import Head from "next/head";

const SignupPage = () => {
  return (
    <div>
      <Head>
        <title>Zabbot - Signup Page</title>
        <meta
          name="description"
          content="Signup to Zabbot Language Learning Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="flex flex-col min-h-screen md:flex-row relative">
        <section className="bg-[#333333] hidden md:block md:w-1/2 lg:w-1/2 pt-20">
        <AuthBanner isLogin={false}/>
        </section>
        <section className="bg-white w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 py-20 min-h-screen">
        <RegisterAuth />
        </section>
      </main>
    </div>
  );
};

export default SignupPage;
