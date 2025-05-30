import React from "react";

const AuthModal = ({ type = "login", onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black"
        >
          ×
        </button>

        <h2 className="text-lg font-bold mb-4 text-center capitalize">
          {type === "login" ? "Login to your account" : "Create a new account"}
        </h2>

        {/* Login with Google */}
        <button
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
        </button>

        {/* Separator */}
        <div className="flex items-center gap-2 mb-4">
          <hr className="flex-grow border-gray-300" />
          <span className="text-xs text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Login / Signup Form */}
        <form className="flex flex-col space-y-3">
          {type != "login" && (
            <div>
              <label className="text-sm font-medium">User Name</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded mt-1"
                placeholder="user name"
              />
            </div>
          )}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
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
