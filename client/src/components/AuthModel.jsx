import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AuthModal = ({ type = "login", onClose }) => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      type === "login"
        ? "http://localhost:5000/api/v1/login"
        : "http://localhost:5000/api/v1/register";
    const payload =
      type === "login"
        ? { phone: formData.phone, password: formData.password }
        : {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Authentication failed");
        return;
      }

      if (type === "login") {
        login(data.user); // Login response has user info
      } else {
        // After successful registration, call login with minimal info or fetch it
        login({
          id: data.userId,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        });
      }

      onClose(); // Close modal
    } catch (err) {
      console.error("Auth error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black"
        >
          ×
        </button>

        <h2 className="text-lg font-bold mb-4 text-center capitalize">
          {type === "login" ? "Login to your account" : "Create a new account"}
        </h2>

        {/* <button
          className="w-full border border-gray-300 rounded py-2 flex items-center justify-center gap-2 hover:bg-gray-50 mb-4"
          onClick={() => alert("Handle Google login here")}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
        </button> */}

        {/* <div className="flex items-center gap-2 mb-4">
          <hr className="flex-grow border-gray-300" />
          <span className="text-xs text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div> */}

        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          {type !== "login" && (
            <div>
              <label className="text-sm font-medium">User Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
                placeholder="User name"
              />
            </div>
          )}
          {type !== "login" && (
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
                placeholder="you@example.com"
              />
            </div>
          )}
          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="Phone number"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white py-2 rounded hover:bg-gray-900"
          >
            {type === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
