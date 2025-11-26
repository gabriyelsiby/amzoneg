import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
    navigate("/login");
  };

  return (
    <nav className="bg-[#131921] text-white px-6 py-3 flex items-center gap-6">

      {/* Amazon Logo */}
      <Link to="/" className="flex items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="amazon"
          className="w-24"
        />
      </Link>

      {/* Location Section */}
      <div className="text-xs leading-tight cursor-pointer hidden md:block">
        <p className="text-gray-300">Delivering to Surat 394210</p>
        <p className="font-bold flex items-center gap-1">
          📍 Update location
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Language Selector */}
      <div className="hidden md:flex items-center gap-1 cursor-pointer">
        <img
          src="https://flagcdn.com/w20/in.png"
          alt="IN Flag"
          className="w-5 h-4"
        />
        <span className="text-sm">EN ▾</span>
      </div>

      {/* Account & Lists */}
      <div className="text-sm cursor-pointer hidden md:block">
        {userId ? (
          <>
            <p className="text-gray-300">Hello, User</p>
            <p className="font-bold">Account & Lists ▾</p>
          </>
        ) : (
          <Link to="/login">
            <p className="text-gray-300">Hello, sign in</p>
            <p className="font-bold">Account & Lists ▾</p>
          </Link>
        )}
      </div>

      {/* Orders */}
      <Link to="/orders" className="hidden md:block text-sm">
        <p className="text-gray-300">Returns</p>
        <p className="font-bold">& Orders</p>
      </Link>

      {/* Cart */}
      <Link to="/cart" className="flex items-center text-lg font-bold">
        <span className="text-2xl">🛒</span>
        <span className="text-sm ml-1">Cart</span>
      </Link>

      {/* Logout / Login Buttons */}
      {userId ? (
        <button
          onClick={handleLogout}
          className="ml-4 bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      ) : (
        <div className="flex gap-3 ml-4">
          <Link to="/login" className="hover:text-gray-300">Login</Link>
          <Link to="/signup" className="hover:text-gray-300">Signup</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
