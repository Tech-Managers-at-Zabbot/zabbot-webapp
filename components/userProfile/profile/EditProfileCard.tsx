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

const EditProfileCard = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
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
                  onClick={() => {
                    console.log("Saving:", formData);
                    setIsEditing(false);
                  }}
                >
                  <div className="flex justify-center items-center gap-2 text-white">
                    <LuSave size={18} />
                    <span>Save Changes</span>
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
              <Image
                src={"/creators/mr-iniobong.svg"}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>

            {isEditing && (
              <InAppButton
                border="1px solid #ACB6C5"
                borderRadius="8px"
                padding="10px 16px"
                onClick={openModal}
              >
                <div className="flex justify-center items-center gap-2 text-[#333]">
                  <MdOutlineFileUpload size={18} />
                  <span>Change profile photo</span>
                </div>
              </InAppButton>
            )}
          </div>
        </section>

        {/* FULL NAME FIELD */}
        <section className="flex flex-col gap-2">
          <label className="text-[#364153] text-sm font-medium">
            Full Name
          </label>
          <NormalInputField
            id="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Iniobong Ekpenyong"
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
            value={formData.email}
            onChange={handleInputChange}
            placeholder="adewale.ogunleye@example.com"
            type="email"
            disabled={!isEditing}
            backgroundColor={isEditing ? "#FFFFFF" : "#EDF9FF"}
            border={isEditing ? "1px solid #0089C8" : "1px solid #84D8FF"}
            color={isEditing ? "#000000" : "#101828"}
          />
        </section>
      </main>

      {/* MODAL */}
      <Modal isOpen={isOpen} onClose={closeModal} size="md">
        <div className="p-6">
          {/* Header */}
          <h2 className="text-xl font-semibold mb-1">Change Profile Picture</h2>
          <p className="text-sm text-gray-600 mb-4">
            Choose how you'd like to update your profile picture
          </p>

          {/* Upload Options */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button className="flex justify-center items-center gap-2 bg-[#0089C8] text-white px-5 py-3 rounded-full text-sm hover:bg-[#007AB5] transition">
              <Upload size={16} />
              Upload from device
            </button>

            <button className="flex justify-center items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-3 rounded-full text-sm hover:bg-gray-50 transition">
              <Camera size={16} />
              Upload from camera
            </button>
          </div>

          {/* Drag & Drop */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center bg-gray-50 hover:border-[#0089C8] transition cursor-pointer mb-6">
            <div className="flex justify-center mb-3">
              <div className="bg-gray-200 p-4 rounded-lg">
                <ImageIcon size={28} className="text-gray-400" />
              </div>
            </div>

            <p className="text-sm text-gray-700">
              Click to upload or drag & drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF (max 5MB)</p>

            <button className="mt-4 flex items-center justify-center gap-2 mx-auto bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition">
              <Upload size={14} />
              Select Image
            </button>
          </div>

          {/* Remove Button */}
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border text-red-600 border-red-300 hover:bg-red-50 transition text-sm">
            <X size={16} />
            Remove Current Avatar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default EditProfileCard;
