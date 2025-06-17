import Navbar from "@/components/general/Navbar";
import SuccessComponent from "@/components/general/SuccessComponent";
import Head from "next/head";

const SuccessPage = () => {
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
          <SuccessComponent />
        </section>
      </main>
    </div>
  );
};

export default SuccessPage;
