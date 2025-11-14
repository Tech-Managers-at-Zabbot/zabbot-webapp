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
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // Add your save logic here
    console.log("Saving:", formData);
    setIsEditing(false);
  };

  return (
    <div>
      <main
        className="flex flex-col gap-10 justify-between px-6 py-14 rounded-2xl border-[0.8px] border-[#FEF3C6] bg-white shadow-lg"
        style={{ fontFamily: "Lexend" }}
      >
        <section className="flex items-center justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#101828] text-lg font-[400] leading-[150%]">
              Personal Information
            </h1>
            <p className="text-base text-[#4A5565] font-[400] leading-[150%]">
              Update your profile details and avatar
            </p>
          </div>
          <div className="flex gap-3">
            {!isEditing ? (
              <InAppButton
                background="#0089C8"
                borderRadius="8px"
                padding="10px"
                height="auto"
                width="auto"
                onClick={handleEditClick}
              >
                <div className="flex font-[400] leading-[143%] justify-between items-center gap-4">
                  <div>
                    <FaRegEdit size={20} />
                  </div>
                  <div>Edit Profile</div>
                </div>
              </InAppButton>
            ) : (
              <>
                <InAppButton
                  border="1px solid #D42620"
                  borderRadius="8px"
                  padding="10px"
                  height="auto"
                  width="auto"
                  onClick={handleCancelClick}
                >
                  <div className="flex font-[400] leading-[143%] text-[#374151] justify-between items-center gap-2 px-2">
                    <div>
                      <MdOutlineCancel size={20} color="#D42620" />
                    </div>
                    <div className="text-[#D42620]">Cancel</div>
                  </div>
                </InAppButton>
                <InAppButton
                  background="#01875C"
                  borderRadius="8px"
                  padding="10px"
                  height="auto"
                  width="auto"
                  onClick={handleSaveClick}
                >
                  <div className="flex font-[400] leading-[143%] text-[#374151] justify-between items-center gap-2 px-2">
                    <div>
                      <LuSave size={20} color="#FFFFFF" />
                    </div>
                    <div className="text-[#FFFFFF]">Save Changes</div>
                  </div>
                </InAppButton>
              </>
            )}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="text-[#364153] font-[400] leading-[100%] text-sm">
            Profile Picture
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-[96px] h-[96px] aspect-[3/4] border-5 border-[#D0D5DD] rounded-full overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <Image
                src={"/creators/mr-iniobong.svg"}
                alt={""}
                fill
                className="object-cover"
              />
            </div>
            {isEditing && (
              <InAppButton
                border="1px solid #ACB6C5"
                borderRadius="8px"
                padding="10px 16px"
                height="auto"
                width="auto"
                onClick={openModal}
              >
                <div className="flex font-[400] leading-[143%] text-[#374151] justify-between items-center gap-2 px-2">
                  <div>
                    <MdOutlineFileUpload size={20} color="#ACB6C5" />
                  </div>
                  <div className="text-[#333]">Change profile photo</div>
                </div>
              </InAppButton>
            )}
          </div>
        </section>

        <section>
          <div>
            <label className="text-[#364153] text-sm font-[400] leading-[100%]">
              Full Name
            </label>
          </div>
          <div>
            <NormalInputField
              id={"fullName"}
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder={"Iniobong Ekpenyong"}
              type={"text"}
              disabled={!isEditing}
              backgroundColor={isEditing ? "#FFFFFF" : "#EDF9FF"}
              border={isEditing ? "1px solid #0089C8" : "1px solid #84D8FF"}
              color={isEditing ? "#000000" : "#101828"}
            />
          </div>
        </section>

        <section>
          <div>
            <label className="text-[#364153] text-sm font-[400] leading-[100%]">
              Email Address
            </label>
          </div>
          <div>
            <NormalInputField
              id={"email"}
              value={formData.email}
              onChange={handleInputChange}
              placeholder={"adewale.ogunleye@example.com"}
              type={"email"}
              disabled={!isEditing}
              backgroundColor={isEditing ? "#FFFFFF" : "#EDF9FF"}
              border={isEditing ? "1px solid #0089C8" : "1px solid #84D8FF"}
              color={isEditing ? "#000000" : "#101828"}
            />
          </div>
        </section>
      </main>

      {/* Change Profile Picture Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} size="md">
        <div className="p-6">
          {/* Modal Header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#252525] mb-2">
              Change Profile Picture
            </h2>
            <p className="text-sm text-[#6B7280]">
              Choose how you'd like to update your profile picture
            </p>
          </div>

          {/* Upload Options */}
          <div className="flex gap-3 mb-6">
            <button className="hover:cursor-pointer flex items-center justify-center gap-2 bg-[#0089C8] text-white px-6 py-3 rounded-full font-[400] text-sm hover:bg-[#007AB5] transition-colors">
              <Upload size={18} />
              Upload from device
            </button>
            <button className="hover:cursor-pointer flex items-center justify-center gap-2 bg-white border border-[#D1D5DB] text-[#374151] px-6 py-3 rounded-full font-[400] text-sm hover:bg-gray-50 transition-colors">
              <Camera size={18} />
              Upload from camera
            </button>
          </div>

          {/* Drag and Drop Area */}
          <div className="border-2 border-dashed border-[#D1D5DB] rounded-2xl p-12 mb-4 text-center bg-[#F9FAFB] hover:border-[#0089C8] transition-colors cursor-pointer">
            <div className="flex justify-center mb-4">
              <div className="bg-[#E5E7EB] p-4 rounded-lg">
                <ImageIcon size={32} className="text-[#9CA3AF]" />
              </div>
            </div>
            <p className="text-sm text-[#374151] mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-[#6B7280]">PNG, JPG or GIF (max 5MB)</p>
            <button className="hover:cursor-pointer mt-4 flex items-center justify-center gap-2 mx-auto bg-white border border-[#D1D5DB] text-[#374151] px-4 py-2 rounded-lg font-[400] text-sm hover:bg-gray-50 transition-colors">
              <Upload size={16} />
              Select Image
            </button>
          </div>

          {/* Remove Avatar Button */}
          <button className="hover:cursor-pointer border border-[#0000001A] w-full flex items-center justify-center gap-2 text-[#DC2626] py-3 rounded-lg font-[400] text-sm hover:bg-[#FEE2E2] transition-colors">
            <X size={18} />
            Remove Current Avatar
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default EditProfileCard;
