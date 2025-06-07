import SuccessComponent from "@/components/SuccessComponent";
import Head from "next/head";

const SuccessPage = () => {


  return (
    <div>
      <Head>
        <title>Zabbot - Success Page</title>
        <meta
          name="description"
          content="Founders-Circle Successful Join"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="flex flex-col bg-[#E3F5FF] min-h-screen relative">
      {/* <LandingPageNavbar /> */}
        <section className="w-full">
        <SuccessComponent />
        </section>
      </main>
    </div>
  );
};

export default SuccessPage;
