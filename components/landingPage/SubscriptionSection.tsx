import React from "react";

const SubscriptionSection = () => {
  const subscriptionOptionsData = [
    {
      title: "Lifetime Access",
      titleDescription: "(one-time payment)",
      cost: "US$159.99",
      subTitle: "One payment. Endless learning.",
      isMostPopular: false,
      backgroundColor: "#DCFFE7",
      border: "1.419px solid #0F973D",
      costColor: "#0F973D",
    },
    {
      title: "Annual Subscription",
      cost: "US$69.99",
      subTitle: "Renews once a year.",
      isMostPopular: true,
      backgroundColor: "#FEF4E4",
      border: "1.419px solid #F3A218",
      costColor: "#EE9705",
      costFrequency: "year",
    },
    {
      title: "Monthly",
      cost: "US$9.99",
      subTitle: "Pause, Stop or Change plan anytime.",
      isMostPopular: false,
      backgroundColor: "#E4F4FC",
      border: "1.419px solid #0089C8",
      costColor: "#0089C8",
      costFrequency: "month",
    },
  ];

  return (
    <div className="relative bg-white" style={{ fontFamily: "Lexend" }}>
      <main className="flex flex-col gap-6 sm:gap-8 md:gap-12 text-[#000000] py-10 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[112px]">
        {/* Header Section */}
        <section className="flex flex-col gap-3 sm:gap-4">
          <h1 className="text-center font-bold leading-[1.2] sm:leading-[1.3] md:leading-[90px] text-3xl sm:text-4xl md:text-5xl lg:text-[60px] text-[#0089C8]">
            Choose Your Learning Path
          </h1>
          <p className="font-normal leading-relaxed sm:leading-[33px] text-lg sm:text-xl md:text-[23px] text-center text-[#4A5565]">
            Start your journey to speaking Yorùbá fluently today!
          </p>
          <p className="font-normal leading-relaxed sm:leading-[33px] text-lg sm:text-xl md:text-[23px] text-center text-[#4A5565]">
            Everyone starts with a{" "}
            <span className="text-[#0C99FF] font-bold">7-day free</span>{" "}
            <span className="text-[#0C99FF] font-normal">trial.</span>
          </p>
        </section>

        {/* Subscription Cards Section */}
        <section className="w-full mt-4 sm:mt-6 md:mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {subscriptionOptionsData.map((option, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: option.backgroundColor,
                  border: option.border,
                }}
                className="py-6 px-6 rounded-2xl sm:rounded-3xl relative flex flex-col"
              >
                {option.isMostPopular && (
                  <div className="absolute -top-3 sm:-top-4 md:-top-5 left-1/2 -translate-x-1/2 bg-[#F56630] rounded-lg text-white px-3 py-1 sm:py-2 text-xs sm:text-sm font-semibold whitespace-nowrap">
                    <span>Most Popular</span>
                  </div>
                )}

                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h2 className="font-semibold leading-tight sm:leading-[29px] text-xl sm:text-2xl md:text-3xl lg:text-[34px] text-[#3D3D3D] mb-2">
                      {option.title}
                    </h2>

                    {option.titleDescription && (
                      <p className="text-[#3D3D3D] font-normal leading-relaxed sm:leading-[29px] text-base sm:text-lg md:text-[19px] mb-4">
                        {option.titleDescription}
                      </p>
                    )}

                    <div
                      className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[46px] leading-tight sm:leading-[56px] md:leading-[64px] mb-2 break-words text-center sm:text-left"
                      style={{ color: option.costColor }}
                    >
                      {option.cost}
                      {option.costFrequency && (
                        <div className="inline-flex items-center ml-2">
                          <span className="text-base sm:text-lg md:text-xl font-semibold">
                            /
                          </span>
                          <span className="text-base sm:text-lg md:text-xl font-semibold ml-1">
                            {option.costFrequency}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-start items-start mt-4">
                    <p className="font-normal flex text-[#6A7282] text-base sm:text-lg md:text-[19px] leading-relaxed sm:leading-[29.79px]">
                      {option.subTitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Section */}
        <section>
          <div className="text-[#4A5565] text-center text-base sm:text-lg md:text-xl lg:text-[24px] font-normal leading-relaxed sm:leading-[33px]">
            Recurring payments . Cancel anytime
          </div>
        </section>
      </main>
    </div>
  );
};

export default SubscriptionSection;
