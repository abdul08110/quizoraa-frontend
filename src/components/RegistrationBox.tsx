import React, { useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const RegistrationBox: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    agree: false,
  });
  const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong" | "none">("none");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const evaluatePasswordStrength = (password: string): "weak" | "medium" | "strong" => {
    if (password.length < 8 || password.includes(" ")) return "weak";
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const hasLetter = /[A-Za-z]/.test(password);
    if (password.length >= 12 && hasNumber && hasSpecial && hasLetter) return "strong";
    if (password.length >= 8 && hasNumber && (hasSpecial || hasLetter)) return "medium";
    return "weak";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    const checked = isCheckbox && (e.target as HTMLInputElement).checked;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: numericValue }));
      return;
    }

    if (name === "pincode") {
      const numericValue = value.replace(/\D/g, "").slice(0, 6);
      setFormData((prev) => ({ ...prev, pincode: numericValue }));
      return;
    }

    if (name === "password") {
      const cleanedPassword = value.replace(/\s/g, "").slice(0, 15);
      setFormData((prev) => ({ ...prev, password: cleanedPassword }));
      setPasswordStrength(cleanedPassword ? evaluatePasswordStrength(cleanedPassword) : "none");
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: isCheckbox ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { fullName, email, phone, password, address, city, state, pincode, agree } = formData;

    if (!fullName || !email || !phone || !password || !address || !city || !state || !pincode) {
      setError("Please fill out all the fields.");
      return;
    }
    if (phone.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }
    if (pincode.length !== 6) {
      setError("Pincode must be exactly 6 digits.");
      return;
    }
    const passwordRegex = /^(?=.*[0-9])(?=.*[^A-Za-z0-9])([^\s]{8,15})$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be 8-15 characters, include a number, a special character, and have no spaces.");
      return;
    }
    if (!agree) {
      setError("You must agree to the terms and privacy policy.");
      return;
    }

    const payload = {
      username: fullName,
      email,
      password,
      address,
      city,
      state,
      pincode,
      mobile: phone
    };

    try {
      const response = await fetch("http://loganathan:8080/req/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        MySwal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Please check the email or contact support.",
          confirmButtonColor: "#6366f1"
        });
        throw new Error("Signup failed");
      }

      const result = await response.json();
      console.log("Signup success:", result);
      setSuccess(true);

      MySwal.fire({
        icon: "success",
        title: "Please Verify Your Email!",
        html: "A confirmation link has been sent to your email.<br><b>Click it to activate your account.</b>",
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#6366f1"
      }).then(() => {
        window.location.href = "/login";
      });

    } catch (err) {
      console.error("Error during signup:", err);
      setError("Please Check The Email Address or contact support.");
    }
  };

  if (success) return null; // hide form after success

  return (
    <div className="min-h-screen bg-indigo-50 flex justify-center items-start px-4 py-10">
      <div className="bg-white p-0 rounded-2xl max-w-2xl w-full shadow-lg overflow-hidden">
        <div className="bg-indigo-600 p-6">
          <h2 className="text-2xl font-bold text-white mb-1">Register for Quizoraa</h2>
          <p className="text-indigo-100 text-sm">Create your account to participate in monthly contests</p>
        </div>

        <div className="p-6">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {error && <div className="text-red-600 font-medium mb-4">{error}</div>}

            {/* Full Name & Email */}
            <div className="flex flex-wrap gap-4 mb-5">
              <div className="flex flex-col flex-1 min-w-[200px]">
                <label className="font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-[200px]">
                <label className="font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Phone & Password */}
            <div className="flex flex-wrap gap-4 mb-5">
              <div className="flex flex-col flex-1 min-w-[200px]">
                <label className="font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  inputMode="numeric"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone"
                  className="p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-[200px]">
                <label className="font-medium mb-1">Create Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="p-3 border border-gray-300 rounded-lg"
                  onKeyDown={(e) => {
                    if (e.key === " ") e.preventDefault();
                  }}
                />
                {passwordStrength !== "none" && (
                  <div className="mt-1">
                    <div
                      className={`h-2 rounded transition-all ${passwordStrength === "weak"
                          ? "bg-red-500 w-1/3"
                          : passwordStrength === "medium"
                            ? "bg-yellow-500 w-2/3"
                            : "bg-green-500 w-full"
                        }`}
                    ></div>
                    <p
                      className={`text-sm mt-1 ${passwordStrength === "weak"
                          ? "text-red-600"
                          : passwordStrength === "medium"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                    >
                      {passwordStrength.charAt(0).toUpperCase() +
                        passwordStrength.slice(1)}{" "}
                      Password
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col mb-5">
              <label className="font-medium mb-1">Full Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your full address"
                className="p-3 border border-gray-300 rounded-lg resize-none"
                rows={3}
              ></textarea>
            </div>

            {/* City / State / Pincode */}
            <div className="flex flex-wrap gap-4 mb-5">
              <div className="flex flex-col flex-1 min-w-[100px]">
                <label className="font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-[100px]">
                <label className="font-medium mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-[100px]">
                <label className="font-medium mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  inputMode="numeric"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Agreement */}
            <div className="w-full mb-5">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="h-4 w-4 accent-indigo-600"
                />
                <label htmlFor="agree" className="text-sm leading-snug">
                  I agree to the{" "}
                  <a href="#" className="text-indigo-600 underline">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-indigo-600 underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition mb-4"
            >
              Register
            </button>

            {/* Redirect to Login */}
            <p className="text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-600 hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationBox;
