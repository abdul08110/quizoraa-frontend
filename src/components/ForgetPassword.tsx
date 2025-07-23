import React, { useState } from "react";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email) {
      setError("Please enter your registered email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Simulate API call
    console.log("Sending password reset to:", email);
    setSuccessMessage("If this email is registered, you will receive a reset link shortly.");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 p-6">
          <h2 className="text-2xl font-bold text-white mb-1">Forgot Password</h2>
          <p className="text-indigo-100 text-sm">
            Enter your registered email to receive a password reset link
          </p>
        </div>

        <div className="px-6 pt-6 pb-8">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            {error && <div className="text-red-600 text-sm font-medium">{error}</div>}
            {successMessage && <div className="text-green-600 text-sm font-medium">{successMessage}</div>}

            <label className="font-medium text-sm">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg text-sm"
            />

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg"
            >
              Send Reset Link
            </button>

            <p className="text-center text-sm mt-4">
              <a href="/login" className="text-indigo-600 hover:underline">
                Back to Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
