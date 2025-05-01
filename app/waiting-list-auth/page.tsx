import Head from "next/head";
import Image from "next/image";
import WaitingListAuth from "@/components/authPage/WaitingListAuth";

export default function WaitingListPage() {
  return (
    <div className="min-h-screen bg-[#A6DFFF] p-0 m-0 overflow-x-hidden">
      <Head>
        <title>Practice Learning a Language with Ease</title>
        <meta
          name="description"
          content="Join users from all over the world and immerse yourself in language & culture"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="bg-[#A6DFFF] w-full h-full relative z-10 m-0 p-0">
        {/* Logo Only - No Navigation */}
        <div className="px-4 sm:px-6 mt-4 lg:px-8">
          <div className="flex justify-start">
            <div className="relative h-10 w-28 sm:h-12 sm:w-32 md:h-14 md:w-36 lg:h-16 lg:w-40">
              <Image
                src={"/general/zabbot-logo-black.png"}
                alt="Language Learning Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Main Content Section */}
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto">
            {/* Left Side - Text and Form */}
            <div className="lg:w-1/2 mb-12 lg:mb-0 flex flex-col">
              {/* Main Heading */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#162B6E] mb-6">
                Practice Learning a 
                Language <br /> with Ease...
              </h1>

              {/* Auth Form */}
              <div className="w-full mb-10 rounded-xl bg-[#162B6E] p-6 max-h-[700px] max-w-md">
                <WaitingListAuth />
              </div>
            </div>

            {/* Right Side - Image and Flags */}
            <div className="lg:w-1/2 relative lg:-mt-4">
              {/* Flags */}
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-lg">
                  <Image
                    src="/general/flags.svg"
                    alt="Language Flags"
                    width={324}
                    height={78}
                  />
                </div>
              </div>

              <div className="mb-6 p-2 rounded-lg bg-white text-[#414141] flex flex-col gap-2 relative">
                {/* Speech bubble arrow pointing down */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
                  <div
                    className="w-0 h-0 
                    border-l-[12px] border-l-transparent 
                    border-t-[20px] border-t-white 
                    border-r-[12px] border-r-transparent"
                  ></div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-[#162B6E] text-lg">Join other users from all over the world</span>
                </div>
                <div className="flex items-center">
                  <p className="text-lg text-[#162B6E] mb-8">
                    From your first words to fluent conversations, we&apos;re here to
                    make learning natural, engaging, and fun. Start practicing
                    today and watch your confidence grow!
                  </p>
                </div>
              </div>

              {/* Mascot */}
              <div className="relative">
                <Image
                  src="/general/mascot-globe-left.png"
                  alt="Language Learning Mascot"
                  width={600}
                  height={600}
                  className="w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}