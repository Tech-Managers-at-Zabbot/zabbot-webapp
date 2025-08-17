import ChangePasswordComponent from "@/components/changePasswordFlow/ChangePasswordComponent";
import Navbar from "@/components/general/Navbar";
import Head from "next/head";
import { Suspense } from 'react';

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
      <main className="flex flex-col bg-[#E3EFFC] min-h-screen relative">
        <Navbar />
        <section className="w-full max-w-screen-2xl pt-20">
          <Suspense fallback={<div>Loading...</div>}>
          <ChangePasswordComponent />
          </Suspense>
        </section>
      </main>
    </div>
  );
};

export default ChangePassword;
