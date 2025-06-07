import LoginAuth from "@/components/authPage/LoginAuth";
import Head from "next/head";
import LoginAuthBanner from "@/components/authPage/LoginAuthBanner";

const Login = () => {
  return (
    <div>
      <Head>
        <title>Zabbot - Login Page</title>
        <meta
          name="description"
          content="Login to Zabbot Language Learning Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="flex flex-col min-h-screen md:flex-row relative">
        <section className="hidden md:block md:w-1/2 lg:w-1/2">
          <LoginAuthBanner />
        </section>
        <section className="bg-white w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 min-h-screen">
          <LoginAuth />
        </section>
      </main>
    </div>
  );
};

export default Login;
