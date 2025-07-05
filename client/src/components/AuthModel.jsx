import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const AuthModal = ({ type = "login", onClose }) => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        toast.error(data.message || "Authentication failed");
        return;
      }

      if (type === "login") {
        login(data.user);
        toast.success("Logged in successfully!");
      } else {
        login({
          id: data.userId,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        });
        toast.success("Registered successfully!");
      }

      onClose();
    } catch (err) {
      console.error("Auth error:", err);
      setLoading(false);
      toast.error("Something went wrong");
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

        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          {type !== "login" && (
            <>
              <div>
                <label className="text-sm font-medium">User Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded mt-1"
                  placeholder="User name"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded mt-1"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </>
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
              required
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
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`${loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-900"
              } text-white py-2 rounded`}
          >
            {loading ? "Please wait..." : type === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
