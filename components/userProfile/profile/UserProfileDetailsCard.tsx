import React from "react";
import Image from "next/image";
import { PiCalendarBlank } from "react-icons/pi";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
// import { useUser } from "@/contexts/UserContext";
import { CgProfile } from "react-icons/cg";
import { useGetSingleUserData } from "@/services/generalApi/users/mutation";

const UserProfileDetailsComponent = () => {
  // const { userProfile } = useUser();
  const { data: userProfile,
    isLoading: userDataLoading
  } = useGetSingleUserData();

  return (
    <div
      className="p-4 sm:p-6 text-[#F9FAFB] bg-[#0089C8] rounded-2xl"
      style={{ fontFamily: "Lexend" }}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar */}
        <section>
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            {userProfile?.data?.profilePicture ? (
              <Image
                src={`${userProfile?.data?.profilePicture}`}
                alt="Profile Image"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <CgProfile size={"100%"} />
              </div>
            )}
          </div>
        </section>

        {/* User Info */}
        <section className="text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start gap-3 sm:gap-4">
            <h1 className="text-xl sm:text-2xl font-semibold leading-tight">
              {/* {userDataLoading ? (
                <div>Loading user details...</div>
              ) : (
                <> */}
              {userDataLoading ? "loading..." : `${userProfile?.data?.firstName} ${userProfile?.data?.lastName}`}
              {/* </> */}
              {/* )} */}
            </h1>

            <div className="text-base sm:text-lg font-normal leading-snug">
              {/* {userDataLoading ? (
                <div>Loading user details...</div>
              ) : ( */}
              <>{userDataLoading ? "loading..." : userProfile?.data?.email}</>
              {/* )} */}
            </div>

            {/* Extra profile info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-6 text-base sm:text-lg font-normal leading-relaxed">
              <div className="flex items-center gap-2">
                <PiCalendarBlank size={20} />
                <span>Joined {userProfile?.data?.verifiedAt ? new Date(userProfile.data.verifiedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "March 2024"}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* <HiMiniArrowTrendingUp size={20} />
                <span>Level 5</span> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfileDetailsComponent;
