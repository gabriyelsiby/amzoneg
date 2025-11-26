import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, googleLogin } from "../api/api";
import { GoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signup({ name, email, password });

      const userId = data.user?._id;
      if (!userId) throw new Error("User ID not returned from API");

      localStorage.setItem("userId", userId);
      alert("Signup successful!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { data } = await googleLogin({
        credential: credentialResponse.credential,
      });

      const userId = data.user?._id;
      if (!userId) throw new Error("User ID not returned from API");

      localStorage.setItem("userId", userId);
      alert("Google Signup/Login successful!");
      navigate("/");
    } catch (error) {
      alert("Google login failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">

      {/* Amazon Logo */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        alt="amazon"
        className="w-32 mb-4"
      />

      {/* Signup Card */}
      <div className="border border-gray-300 rounded-md w-96 p-6">

        <h1 className="text-2xl font-semibold mb-4">Create Account</h1>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <label className="text-sm font-medium">Your name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-400 w-full p-2 rounded mt-1 mb-4 focus:ring-1 focus:ring-yellow-500"
            required
          />

          {/* Email / Phone */}
          <label className="text-sm font-medium">E MAIL</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 w-full p-2 rounded mt-1 mb-4 focus:ring-1 focus:ring-yellow-500"
            required
          />

          {/* Password */}
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 w-full p-2 rounded mt-1 mb-4 focus:ring-1 focus:ring-yellow-500"
            required
          />

          {/* Amazon Yellow Button */}
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 w-full py-2 rounded text-sm font-medium border border-yellow-600"
          >
            Verify mobile number
          </button>
        </form>

        <div className="mt-6">
          <p className="text-sm font-medium">Buying for work?</p>
          <p className="text-blue-600 text-sm cursor-pointer">
            Create a free business account
          </p>
        </div>

        <hr className="my-4" />

        <p className="text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Sign in
          </span>
        </p>

        <p className="text-xs mt-4">
          By creating an account or logging in, you agree to Amazon's{" "}
          <span className="text-blue-600 cursor-pointer">Conditions of Use</span>{" "}
          and{" "}
          <span className="text-blue-600 cursor-pointer">Privacy Notice</span>.
        </p>
      </div>

      {/* Separator */}
      <div className="flex items-center w-96 mt-6 mb-2">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-2 text-gray-500 text-sm">or</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* Google Login */}
      <div className="border w-96 py-3 flex justify-center rounded cursor-pointer bg-gray-50">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => console.log("Google Login Failed")}
        />
      </div>

      {/* Footer */}
      <div className="flex gap-6 text-xs text-blue-600 mt-8">
        <span className="cursor-pointer">Conditions of Use</span>
        <span className="cursor-pointer">Privacy Notice</span>
        <span className="cursor-pointer">Help</span>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        © 1996–2024, Amazon.com, Inc. or its affiliates
      </p>
    </div>
  );
};

export default Signup;
