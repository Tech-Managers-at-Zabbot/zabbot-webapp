return (
  <div className="p-0 m-0 overflow-x-hidden">
    <Head>
      <title>Practice Learning a Language with Ease</title>
      <meta
        name="description"
        content="Join users from all over the world and immerse yourself in language & culture"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>

    {/* Full width blue top section */}
    <div className="w-full bg-[#A6DFFF]">
      {/* Logo and Beta Test Button Container - Same line on larger screens */}
      <div className="hidden lg:flex justify-between items-center p-4 px-6 lg:px-10">
        {/* Logo */}
        <div className="relative xl:w-[340px] lg:w-[250px] w-[200px] h-[118px]">
          <Image
            src="/general/zabbot-logo-blue.svg"
            alt="Zabbot blue Logo"
            fill
            priority
            className="object-contain"
          />
        </div>
        
        {/* Beta Test Button */}
        <div className="w-full max-w-[200px] flex items-center justify-center">
          <InAppButton
            disabled={false}
            disabledColor={appColors.disabledButtonBlue}
            backgroundColor={appColors.darkRoyalBlueForBtn}
            width="100%"
            onClick={() => {
              setIsSignupRedirectLoading(true);
              router.push("/signup");
            }}
          >
            {isSignupRedirectLoading ? (
              <CustomSpinner />
            ) : (
              <div>Beta Test</div>
            )}
          </InAppButton>
        </div>
      </div>

      {/* Content container with original padding and max-width */}
      <div className="w-full h-full relative m-0 p-0 max-w-screen-2xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isMounted ? "show" : "hidden"}
          className="flex flex-col items-center"
        >
          {/* TOP PART CONTENT - EXACTLY AS ORIGINAL */}
          <div className="flex flex-col lg:flex-row w-full px-4 md:px-6 lg:px-10 pt-10 md:pt-16 lg:pt-20">
            {/* Logo - Only visible on small screens */}
            <div className="lg:hidden flex justify-center">
              <div className="relative xl:w-[340px] lg:w-[250px] md:w-[220px] w-[200px] h-[118px]">
                <Image
                  src="/general/zabbot-logo-blue.svg"
                  alt="Zabbot blue Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {/* Content area - UNCHANGED */}
            <div className="flex flex-col lg:flex-row w-full items-center justify-between">
              {/* Form container - Only added z-50 here */}
              <section className="w-full lg:w-[45%] flex justify-center order-2 lg:order-1 mt-8 lg:mt-0">
                <div className="shadow-2xl xl:max-w-[500px] 2xl:max-w-[550px] max-w-[550px] rounded-[24px] px-6 lg:px-10 py-10 lg:py-[10px] 2xl:py-[10px] bg-white w-full lg:mt-30 lg:ml-10 xl:absolute 2xl:left-10 2xl:top-20 xl:top-20 relative z-50">
                  <Suspense fallback={<div>Loading...</div>}>
                  <WaitingListAuth />
                  </Suspense>
                </div>
              </section>

              {/* Beta Test Button - Only visible on small screens, positioned above mascot */}
              <div className="lg:hidden w-full flex justify-center order-1 mb-4">
                <div className="w-full max-w-[200px] flex items-center justify-center">
                  <InAppButton
                    disabled={false}
                    disabledColor={appColors.disabledButtonBlue}
                    backgroundColor={appColors.darkRoyalBlueForBtn}
                    width="100%"
                    onClick={() => {
                      setIsSignupRedirectLoading(true);
                      router.push("/signup");
                    }}
                  >
                    {isSignupRedirectLoading ? (
                      <CustomSpinner />
                    ) : (
                      <div>Beta Test</div>
                    )}
                  </InAppButton>
                </div>
              </div>

              {/* Mascot component - UNCHANGED */}
              <div className="w-full lg:w-[50%] xl:mt-2 flex items-center justify-center order-2 lg:order-2 pb-8 lg:pb-0">
                <FoundersMascotComponent />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Full width light blue bottom section */}
    <div className="w-full bg-[#E3F5FF]">
      {/* Content container with original padding and max-width */}
      <div className="w-full h-full relative m-0 p-0 max-w-screen-2xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isMounted ? "show" : "hidden"}
          className="flex flex-col items-center"
        >
          {/* BOTTOM PART CONTENT - EXACTLY AS ORIGINAL */}
          <div className="w-full pt-16 md:pt-20 lg:pt-30 xl:pt-60 pb-12 md:pb-16 lg:pb-20">
            <FoundersListBottomInformation />
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);