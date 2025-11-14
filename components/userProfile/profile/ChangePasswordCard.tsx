import React from "react";
import InAppButton from "../../InAppButton";
import NormalInputField from "../../NormalInputField";

const ChangePasswordCard = () => {
  const [formData, setFormData] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
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
              Change Password
            </h1>
            <p className="text-base text-[#4A5565] font-[400] leading-[150%]">
              Update your password to keep your account secure
            </p>
          </div>
        </section>

        <section>
          <div>
            <label className="text-[#364153] text-sm font-[400] leading-[100%]">
              Current Password
            </label>
          </div>
          <div>
            <NormalInputField
              id={"currentPassword"}
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder={"Enter current password"}
              type={"text"}
              backgroundColor={"#FFFFFF"}
              border={"1px solid #0089C8"}
              color={"#000000"}
            />
          </div>
        </section>

        <section>
          <div>
            <label className="text-[#364153] text-sm font-[400] leading-[100%]">
              New Password
            </label>
          </div>
          <NormalInputField
            id={"newPassword"}
            value={formData.newPassword}
            onChange={handleInputChange}
            placeholder={"Enter new password"}
            type={"text"}
            backgroundColor={"#FFFFFF"}
            border={"1px solid #0089C8"}
            color={"#000000"}
          />
        </section>

        <section>
          <div>
            <label className="text-[#364153] text-sm font-[400] leading-[100%]">
              Confirm New Password
            </label>
          </div>
          <div>
            <NormalInputField
              id={"confirmNewPassword"}
              value={formData.confirmNewPassword}
              onChange={handleInputChange}
              placeholder={"Confirm new password"}
              type={"text"}
              backgroundColor={"#FFFFFF"}
              border={"1px solid #0089C8"}
              color={"#000000"}
            />
          </div>
        </section>

        <section>
          <div className="flex gap-3">
            <InAppButton
              background="#0089C8"
              borderRadius="8px"
              padding="10px"
              height="auto"
              width="auto"
              onClick={() => {}}
            >
              <div className="flex font-[400] leading-[143%] justify-between items-center gap-4">
                <div>Update Password</div>
              </div>
            </InAppButton>
          </div>
        </section>
      </main>
    </div>
  );
};
export default ChangePasswordCard;
