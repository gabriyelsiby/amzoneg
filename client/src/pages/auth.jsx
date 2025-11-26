import React, { useState, useContext } from "react";
import API, { setAuthToken } from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Auth() {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignup ? "/auth/signup" : "/auth/login";
      const res = await API.post(endpoint, { email, password });
      setUser(res.data);
      setAuthToken(document.cookie); // token stored in cookie
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl mb-4">{isSignup ? "Signup" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {isSignup && (
          <input type="text" placeholder="Name" className="p-2 border" />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border"
        />
        <button className="bg-blue-500 text-white p-2">
          {isSignup ? "Signup" : "Login"}
        </button>
      </form>
      <p className="mt-4 text-center cursor-pointer text-blue-700" onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}
      </p>
    </div>
  );
}
