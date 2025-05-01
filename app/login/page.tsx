import AuthBanner from "@/components/authPage/AuthBanner";
import LoginAuth from "@/components/authPage/LoginAuth";
import Head from "next/head";

const Login = () => {


  return (
    <div>
      <Head>
        <title>Zabbot - Login Page</title>
        <meta
          name="description"
          content="Signup to Zabbot Language Learning Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="flex flex-col min-h-screen md:flex-row relative">
        <section className="bg-[#333333] hidden md:block md:w-1/2 lg:w-1/2 pt-20">
        <AuthBanner isLogin={true}/>
        </section>
        <section className="bg-white w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 py-20 min-h-screen">
        <LoginAuth />
        </section>
      </main>
    </div>
  );
};

export default Login;
