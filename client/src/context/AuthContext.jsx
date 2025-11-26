import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage
  const [user, setUser] = useState(
    localStorage.getItem("userId")
      ? { _id: localStorage.getItem("userId") }
      : null
  );

  // No need to fetch from /auth/me since backend doesn't have it
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId && !user) {
      setUser({ _id: userId });
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userId");
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
