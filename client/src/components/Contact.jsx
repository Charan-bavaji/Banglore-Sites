import React, { useState } from "react";
import contactImg from "../assets/pexels-serjosoza-30117022 1.png"; // adjust path
import { showSuccess, showError } from "../utils/toast";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const res = await fetch("http://localhost:5000/api/v1/contactUs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        showError(data.message || "Something went wrong");
        return;
      }

      showSuccess("Successfully submitted!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      showError("Network error. Try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div id="contact" className="bg-[#f4f3eb] py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left - Form */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Contact us / Enquiry
          </h2>
          <p className="text-sm text-gray-500 mb-6">no unwanted calls or sms</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="w-full border border-gray-400 rounded px-3 py-2"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="w-full border border-gray-400 rounded px-3 py-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="youremail@gmail.com"
                className="w-full border border-gray-400 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="91+ 000 000 0000"
                className="w-full border border-gray-400 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Leave a message"
                rows={3}
                className="w-full border border-gray-400 rounded px-3 py-2"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`bg-[#7a9b00] text-black font-semibold px-6 py-2 rounded shadow transition ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
                }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                "SUBMIT"
              )}
            </button>

          </form>

          <p className="mt-8 font-semibold text-3xl text-gray-800">
            Buy land plots for <br />
            construction and business....
          </p>
        </div>

        {/* Right - Image */}
        <div>
          <img
            src={contactImg}
            alt="Contact visual"
            className="rounded-3xl w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
