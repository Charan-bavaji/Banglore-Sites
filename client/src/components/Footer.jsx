import React from "react";
import facebook from "../assets/square-facebook-brands.svg";
import instagram from "../assets/square-instagram-brands.svg";
import logo from "../assets/Add a heading (1).png";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import { Instagram, Twitter, Facebook, Whatsapp } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/v1/contactUs", {
        firstName: "subscribe",
        lastName: "subscribe",
        email,
        phoneNumber: "subscribe",
        message: "subscribe",
      });
      toast.success("Subscribed successfully");
      setEmail("");
    } catch (err) {
      toast.error("Subscription failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <footer className="bg-white border-t border-gray-300 px-6 py-8 text-sm text-gray-800">
      {/* Top section */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-gray-300">
        {/* Links */}
        <div className="space-y-2">
          <p>About us</p>
          <p>Contact Us</p>
          <p>Help/FAQs</p>
        </div>
        <div className="space-y-2">
          <p>Home</p>
          <p>Blogs</p>
          <p>Explore lands</p>
        </div>
        <div className="space-y-2">
          <p>Hand Picked lands</p>
          <p>New Projects</p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-lg">Join our newsletter</h3>
          <p className="text-sm text-gray-600 mb-2">
            we’ll send you a new land/plots once per week, No spam
          </p>
          <div className="flex gap-2 mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-400 rounded px-3 py-1 text-sm w-full"
            />
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="bg-[#7a9b00] text-white px-4 py-1.5 rounded hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto mt-6 gap-4">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-xl font-bold text-blue-600 bg-black rounded-full overflow-hidden"
          >
            <img src={logo} alt="logo" width={50} />
          </Link>
        </div>

        {/* Social icons */}
        {/* <div className="flex justify-center items-center gap-4 text-black">
          <img src={facebook} alt="" width={30} />
          <img src={instagram} alt="" width={30} />
        </div> */}

        {/* Copyright */}
        <p className="text-xs text-gray-700 text-center md:text-right">
          ©2025 Bangloresites LLC. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
