/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import InAppButton from "../../InAppButton";
import { FaRegEdit } from "react-icons/fa";
import NormalInputField from "../../NormalInputField";
import { MdOutlineCancel } from "react-icons/md";
import { LuSave } from "react-icons/lu";
import { MdOutlineFileUpload } from "react-icons/md";
import { Upload, Camera, Image as ImageIcon, X } from "lucide-react";
import { Modal, useModal } from "../../general/Modal";
import { useUser } from "@/contexts/UserContext";
import { useAlert } from "next-alert";
import { CustomSpinner } from "@/components/CustomSpinner";
import ChangeProfileImageCard from "./ChangeProfileImageCard";
import { CgProfile } from "react-icons/cg";
import { useChangeUserNames, useGetSingleUserData } from "@/services/generalApi/users/mutation";

const EditProfileCard = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const { addAlert } = useAlert();
  const { isOpen, openModal, closeModal } = useModal();
  // const { userProfile } = useUser();
    const { data: userProfile, isLoading: userDataLoading } = useGetSingleUserData();

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
  });

  const isSaveDisabled =
    formData.firstName.trim() === "" && formData.lastName.trim() === "";

  const { mutate: changeNames, isPending: isChangingNames } =
    useChangeUserNames();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value.trim() !== "")
      );

      changeNames(dataToSend, {
        onSuccess: () => {
          setIsEditing(false);
          addAlert("Success", "Change Successful", "success");
          formData.firstName = "";
          formData.lastName = "";
        },
        onError: (error: any) => {
          addAlert(
            "Error",
            error?.response?.data?.message ||
              "An error occurred, please try again",
            "error"
          );
        },
      });
    } catch (error: any) {
      console.log("error", error.message);
    }
  };

  return (
    <div style={{ fontFamily: "Lexend" }}>
      <main
        className="
          flex flex-col gap-10 px-4 sm:px-6 py-10 sm:py-14 
          rounded-2xl border border-[#FEF3C6] bg-white shadow-lg
        "
      >
        {/* HEADER */}
        <section
          className="
            flex flex-col md:flex-row justify-between md:items-start 
            gap-6
          "
        >
          {/* Title */}
          <div className="flex flex-col gap-2">
            <h1 className="text-[#101828] text-lg sm:text-xl font-medium">
              Personal Information
            </h1>
            <p className="text-sm sm:text-base text-[#4A5565]">
              Update your profile details and avatar
            </p>
          </div>

          {/* Edit / Save / Cancel Buttons */}
          <div className="flex gap-3 flex-wrap">
            {!isEditing ? (
              <InAppButton
                background="#0089C8"
                borderRadius="8px"
                padding="10px 14px"
                onClick={() => setIsEditing(true)}
                disabled={isChangingNames}
              >
                <div className="flex items-center justify-center gap-2 text-white">
                  <FaRegEdit size={18} />
                  <span>Edit Profile</span>
                </div>
              </InAppButton>
            ) : (
              <>
                <InAppButton
                  border="1px solid #D42620"
                  borderRadius="8px"
                  padding="10px 14px"
                  onClick={() => setIsEditing(false)}
                  disabled={isChangingNames}
                >
                  <div className="flex justify-center items-center gap-2 text-[#D42620]">
                    <MdOutlineCancel size={18} />
                    <span>Cancel</span>
                  </div>
                </InAppButton>

                <InAppButton
                  background="#01875C"
                  borderRadius="8px"
                  padding="10px 14px"
                  onClick={(event: any) => handleSubmit(event)}
                  disabled={isSaveDisabled || isChangingNames}
                >
                  <div>
                    {isChangingNames ? (
                      <div>{<CustomSpinner />}</div>
                    ) : (
                      <div className="flex justify-center items-center gap-2 text-white">
                        <LuSave size={18} />
                        <span>Save Changes</span>
                      </div>
                    )}
                  </div>
                </InAppButton>
              </>
            )}
          </div>
        </section>

        {/* PROFILE PICTURE */}
        <section className="flex flex-col gap-3">
          <span className="text-[#364153] text-sm font-medium">
            Profile Picture
          </span>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-sm border">
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

            {isEditing && (
              <InAppButton
                border="1px solid #ACB6C5"
                borderRadius="8px"
                padding="10px 16px"
                onClick={openModal}
                disabled={isChangingNames}
              >
                <div className="flex justify-center items-center gap-2 text-[#333]">
                  <MdOutlineFileUpload size={18} />
                  <span>Change photo</span>
                </div>
              </InAppButton>
            )}
          </div>
        </section>

        {/* FULL NAME FIELD */}
        <section className="flex flex-col gap-2">
          <label className="text-[#364153] text-sm font-medium">
            First Name
          </label>
          <NormalInputField
            id="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder={isEditing ? "" : userDataLoading ? "loading..." : `${userProfile?.data?.firstName}`}
            type="text"
            disabled={!isEditing}
            backgroundColor={isEditing ? "#FFFFFF" : "#EDF9FF"}
            border={isEditing ? "1px solid #0089C8" : "1px solid #84D8FF"}
            color={isEditing ? "#000000" : "#101828"}
          />
        </section>

        <section className="flex flex-col gap-2">
          <label className="text-[#364153] text-sm font-medium">
            Last Name
          </label>
          <NormalInputField
            id="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder={isEditing ? "" : userDataLoading ? "loading..." : `${userProfile?.data?.lastName}`}
            type="text"
            disabled={!isEditing}
            backgroundColor={isEditing ? "#FFFFFF" : "#EDF9FF"}
            border={isEditing ? "1px solid #0089C8" : "1px solid #84D8FF"}
            color={isEditing ? "#000000" : "#101828"}
          />
        </section>

        {/* EMAIL FIELD */}
        <section className="flex flex-col gap-2">
          <label className="text-[#364153] text-sm font-medium">
            Email Address
          </label>
          <NormalInputField
            id="email"
            value={""}
            onChange={handleInputChange}
            placeholder={userDataLoading ? "loading..." : userProfile?.data?.email}
            type="email"
            disabled={true}
            backgroundColor={"#EDF9FF"}
            border={"1px solid #84D8FF"}
            color={"#101828"}
          />
        </section>
      </main>

      <div>
        <ChangeProfileImageCard isOpen={isOpen} onClose={closeModal} />
      </div>
    </div>
  );
};

export default EditProfileCard;
