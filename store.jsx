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
        <section className="md:block w-full pt-10 md:pt-20 px-4 md:px-0">
          <OtpComponent />
        </section>
        <section className="hidden md:block absolute bottom-0 right-10 lg:right-70 flex items-center justify-center animate__animated animate__fadeInUp animate__delay-1s">
          <div className="relative flex items-center justify-center">
            <Image
              src="/general/grandpa-mascot.png"
              alt="Zabbot Grand Ma Mascot Owl"
              width={323}
              height={600}
              className="object-contain rounded-xl w-auto h-[400px] lg:h-[600px]"
              priority
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Otp;



  return (
    <div className="w-full max-w-[615px] border border-[#D0D0D0] bg-white rounded-2xl py-6 md:py-[60px] flex flex-col gap-4 md:gap-[24px] mx-auto px-4 sm:px-6 md:px-[60px]">
      <div className="flex items-center justify-between">
        <div className="hover:cursor-pointer" onClick={() => router.back()}>
          <IoChevronBackSharp size={24} md:size={28} color="#1C2024" />
        </div>
        <h1 className="text-xl sm:text-2xl text-[#1C2024] font-bold">Forgot Password</h1>
        <div className="hover:cursor-pointer" onClick={() => router.push('/login')}>
          <IoCloseOutline size={24} md:size={28} color="#1C2024" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-10 mt-6 sm:mt-10">
        <div className="flex flex-col gap-2 sm:gap-[8px]">
          <label
            htmlFor="email"
            className="block text-sm sm:text-[15px] leading-[20px] font-medium text-[#60646C] mb-1 sm:mb-2"
          >
            Email address
          </label>
          <div className="relative">
            <NormalInputField
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Type your email address"
              type="email"
              border="0"
            />
          </div>
          {emailError && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">{emailError}</p>
          )}
        </div>

        <div className="mt-4 sm:mt-6">
          <InAppButton
                      disabledColor="#80BBFF"
                      width="100%"
                      disabled={buttonDisabled || isRequestingPasswordLink}
                      backgroundColor={appColors.darkRoyalBlueForBtn}
                    >
                      { isRequestingPasswordLink ? <CustomSpinner /> : <div>Continue</div> }
                    </InAppButton>
        </div>
      </form>
      <Alerts
        position="top-left"
        direction="right"
        timer={3000}
        className="rounded-md relative z-1000 !w-80"
      />
    </div>
  );

  