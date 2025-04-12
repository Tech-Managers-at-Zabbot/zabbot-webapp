/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Alerts } from "next-alert";
import NormalInputField from "../NormalInputField";
// import { LoadingIcon } from "../constants/svgPath";
// import { loginUser } from "@/axiosFolder/axiosFunctions/axiosLinkToBackend";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginAuth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });

  return (
    <div className="w-full max-w-md mx-auto py-4">
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#60646C]">
            Email
          </label>
          <NormalInputField
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError({ ...error, emailError: false });
            }}
            placeholder="Input your email address"
            type="email"
            error={error.emailError}
            errorMessage="Email is required"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[#60646C]">
            Password
          </label>
          <div className="relative">
            <NormalInputField
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError({ ...error, passwordError: false });
              }}
              placeholder="Input your password"
              type={showPassword ? "text" : "password"}
              error={error.passwordError}
              errorMessage="Password is required"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
              ) : (
                <AiOutlineEye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
        {/* <div className="mt-6">
          <Button type="submit" disabled={loading} onClick={handleSubmit}>
            {loading ? <LoadingIcon /> : "Login"}
          </Button>
        </div> */}
      </form>
      <Alerts
        position="bottom-right"
        direction="right"
        timer={3000}
        className="rounded-md relative z-50 !w-80"
      />
    </div>
  );
};

export default LoginAuth;