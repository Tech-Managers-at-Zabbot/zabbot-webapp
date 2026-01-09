import Navbar from "@/components/general/Navbar";
import Head from "next/head";

const Flashcards = () => {
  return (
    <div>
      <Head>
        <title>Zabbot - Flashcards Page</title>
        <meta
          name="description"
          content="Signup to Zabbot Language Learning Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="flex flex-col bg-[#E3EFFC] min-h-screen relative">
        <Navbar />
        <section className="w-full max-w-screen-2xl pt-20">
          
        </section>
      </main>
    </div>
  );
};

export default Flashcards;
