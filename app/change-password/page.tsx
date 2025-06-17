import ChangePasswordComponent from "@/components/changePasswordFlow/ChangePasswordComponent";
import Navbar from "@/components/general/Navbar";
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
      <main className="flex flex-col bg-[#E3EFFC] min-h-screen relative">
        <Navbar />
        <section className="w-full pt-20">
          <ChangePasswordComponent />
        </section>
      </main>
    </div>
  );
};

export default ChangePassword;
