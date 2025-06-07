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
      <main className="flex gap-0 min-h-screen md:flex-row relative">
        <section className="hidden border-0 md:block md:w-1/2 lg:w-1/2">
        <AuthBanner />
        </section>
        <section className="bg-white border-0 w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 py-20">
        <RegisterAuth />
        </section>
      </main>
    </div>
  );
};

export default SignupPage;
