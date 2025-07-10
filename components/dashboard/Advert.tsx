/* eslint-disable @next/next/no-img-element */
import React from "react";

const ProverbsComponent = () => {
  return (
    <section
      className="relative w-full flex min-h-[300px] bg-[url('/userDashboard/proverbs-history-card.png')] bg-cover bg-center rounded-xl"
      style={{ boxShadow: "-8px 8px 20px rgba(0, 0, 0, 0.15)", fontFamily: "Lexend" }}
    >
      <div className="flex-1 gap-4 absolute top-20 left-25 flex justify-center items-center flex-col">
        <div className="font-bold text-center text-[35px] leading-[100%] text-white">
          <h3>Proverbs,</h3>
          <h3>History &</h3>
          <h3>Humor</h3>
        </div>
        <div className="flex justify-center items-center">
          <button className="px-[19.51px] hover:cursor-pointer hover:bg-transparent hover:text-white hover:border font-bold text-[15.61px] text-center leading-[100%] text-[#127978] py-[9.76px] bg-white rounded-4xl">
            Learn More
          </button>
        </div>
      </div>

      <div className="absolute right-0 bottom-0">
        <img
          src="/userDashboard/grandpa-owl-book.png"
          alt="Badge"
          className="w-[200px] h-[250px] object-fill"
        />
      </div>
    </section>
  );
};

const ConsonantComponent = () => {
  return (
    <section
      className="relative w-full flex-col justify-between items-center flex min-h-[300px] bg-[#FFFF79] rounded-xl"
      style={{ boxShadow: "-8px 8px 20px rgba(0, 0, 0, 0.15)", fontFamily: "Lexend" }}
    >
      <div className="mt-[13px] flex flex-col justify-center items-center gap-2 text-center">
        <div className="text-[#5DA0D7] font-bold text-[46.83px] leading-[100%]">
          <h3>Consonant</h3>
          <h3>Toolkit</h3>
        </div>
        <div className="flex justify-center items-center">
          <button className="px-[19.51px] hover:cursor-pointer hover:bg-transparent hover:text-[#207EC5] hover:border font-bold text-[15.61px] text-center leading-[100%] text-white py-[9.76px] bg-[#207EC5] rounded-4xl">
            Learn More
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <img
          src="/userDashboard/nesting-bird.png"
          alt="A nesting Bird"
          className="w-full max-w-[300px] h-full object-fill"
        />
      </div>
    </section>
  );
};

const InviteFriendsComponent = () => {
  return(
      <section
        className="relative w-full p-0 items-stretch flex min-h-[300px] bg-[#60C6A0] rounded-xl"
        style={{ boxShadow: "-8px 8px 20px rgba(0, 0, 0, 0.15)", fontFamily: "Lexend" }}
      >
        <div className="flex flex-1 flex-col pl-10 w-full items-start justify-around">
          <div className="flex flex-col gap-6">
          <div className="font-bold text-[60px] leading-[100%]">
            <h2>Invite</h2>
            <h2>Friends</h2>
          </div>

          <div className="font-bold text-[25px] leading-[100%]">
            <h2>Win great prizes!</h2>
          </div>
            </div>

          <div className="flex justify-center items-center">
            <button className="px-[19.51px] hover:cursor-pointer hover:bg-transparent hover:border font-bold text-[15.61px] text-center leading-[100%] text-white py-[9.76px] bg-[#266950] rounded-4xl">
              Get the link
            </button>
          </div>
        </div>

        <div className="">
          <img
            src="/userDashboard/parrot-mascot.png"
            alt="A parrot on a tree branch"
            className="w-[230px] h-full object-fill"
          />
        </div>
      </section>
  )
}

const Advert = () => {
  return (
    <div
      className="flex gap-[18.54px] p-0 justify-between items-center"
      style={{ fontFamily: "Lexend" }}
    >
      <ProverbsComponent />
      <ConsonantComponent />
      <InviteFriendsComponent />
    </div>
  );
};

export default Advert;
