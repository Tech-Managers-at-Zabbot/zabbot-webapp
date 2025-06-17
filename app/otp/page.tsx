import Navbar from "@/components/general/Navbar";
import OtpComponent from "@/components/OtpComponent";
import Head from "next/head";
import Image from "next/image";

const Otp = () => {
  return (
    <div>
      <Head>
        <title>Zabbot - OTP Page</title>
        <meta
          name="description"
          content="Signup to Zabbot Language Learning Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="flex flex-col bg-[#E3EFFC] pb-30 min-h-screen relative">
        <Navbar />
        <section className="md:block w-full pt-20">
          <OtpComponent />
        </section>
        <section className="absolute bottom-0 xl:right-70 lg:right-20 flex items-center justify-center animate__animated animate__fadeInUp animate__delay-1s">
          <div className="relative flex items-center justify-center">
            <Image
              src="/general/grandpa-mascot.png"
              alt="Zabbot Grand Ma Mascot Owl"
              width={323}
              height={600}
              className="object-contain rounded-xl w-auto h-[150px] md:h-[300px] lg:h-[400px] xl:h-[300px]"
              priority
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Otp;
