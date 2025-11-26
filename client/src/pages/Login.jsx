import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, googleLogin } from "../api/api";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      const userId = data.user?._id;

      if (!userId) throw new Error("User ID not returned");

      localStorage.setItem("userId", userId);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { data } = await googleLogin(credentialResponse.credential);
      const userId = data.user?._id;

      if (!userId) throw new Error("User ID not returned");

      localStorage.setItem("userId", userId);
      alert("Google login successful!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Google login failed");
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

      {/* Login Box */}
      <div className="border border-gray-300 rounded-md w-96 p-6">

        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>

        {/* Email */}
        <label className="font-medium text-sm">Email or mobile phone number</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-400 w-full p-2 rounded mt-1 mb-4 focus:ring-1 focus:ring-yellow-500"
          required
        />

        {/* Password */}
        <label className="font-medium text-sm">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-400 w-full p-2 rounded mt-1 mb-4 focus:ring-1 focus:ring-yellow-500"
          required
        />

        {/* Continue Button (Amazon Yellow) */}
        <button
          onClick={handleSubmit}
          className="bg-yellow-400 hover:bg-yellow-500 w-full py-2 rounded text-sm font-medium border border-yellow-600"
        >
          Continue
        </button>

        <p className="text-xs mt-4">
          By continuing, you agree to Amazon’s{" "}
          <span className="text-blue-600 cursor-pointer">Conditions of Use</span>{" "}
          and{" "}
          <span className="text-blue-600 cursor-pointer">Privacy Notice</span>.
        </p>

        <p className="text-blue-600 text-sm mt-4 cursor-pointer">Need help?</p>

        <hr className="my-4" />

        <p className="text-sm font-medium">Buying for work?</p>
        <p className="text-blue-600 text-sm cursor-pointer">Shop on Amazon Business</p>
      </div>

      {/* Create Account Section */}
      <div className="w-96 text-center mt-6 text-sm text-gray-600">
        <span className="bg-white px-2">New to Amazon?</span>
      </div>

      <button
        onClick={() => navigate("/register")}
        className="mt-2 border border-gray-400 w-96 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm"
      >
        Create your Amazon account
      </button>

      {/* Google Login */}
      <div className="mt-4 w-96 text-center">
        <p className="text-sm mb-2">or login with Google</p>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("Google Login Failed")}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
