import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginBox: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("user");

  // User credentials
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Admin tab (unused, but kept for UI toggle)
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  // Error state
  const [error, setError] = useState("");

  // Load saved login info from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");
    const savedRemember = localStorage.getItem("rememberMe") === "true";

    if (savedEmail && savedPassword && savedRemember) {
      setUserEmail(savedEmail);
      setUserPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/", { replace: true }); // ✅ redirect and prevent going back
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (activeTab === "user") {
      if (!userEmail || !userPassword) {
        setError("Please enter both email and password.");
        return;
      }

      if (userEmail !== "user@example.com" || userPassword !== "password123") {
        setError("Invalid email or password.");
        return;
      }

      // Save login if remember me is checked
      if (rememberMe) {
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("userPassword", userPassword);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userPassword");
        localStorage.removeItem("rememberMe");
      }

      console.log("User login with:", userEmail);
      localStorage.setItem("isLoggedIn", "true"); // ✅ Add this
      navigate("/"); // Replace with your actual route
    } else {
      if (!adminUsername || !adminPassword) {
        setError("Please enter both admin username and password.");
        return;
      }

      // Admin login is not implemented
      setError("Admin login is disabled.");
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 p-6">
          <h2 className="text-2xl font-bold text-white mb-1">Login to Quizoraa</h2>
          <p className="text-indigo-100 text-sm">Access your account to participate in contests</p>
        </div>

        <div className="px-6 pt-4 pb-6">
          <div className="flex justify-center space-x-6 mb-6 border-b border-gray-200">
            <button
              className={`py-2 font-semibold text-sm ${activeTab === "user"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500"
                }`}
              onClick={() => {
                setActiveTab("user");
                setError("");
              }}
            >
              User Login
            </button>
            <button
              className={`py-2 font-semibold text-sm ${activeTab === "admin"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500"
                }`}
              onClick={() => {
                setActiveTab("admin");
                setError("");
              }}
            >
              Admin Login
            </button>
          </div>

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            {error && <div className="text-red-600 text-sm font-medium">{error}</div>}

            {activeTab === "user" ? (
              <>
                <label className="font-medium text-sm">Email Address</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter email"
                  className="p-3 border border-gray-300 rounded-lg text-sm"
                />

                <label className="font-medium text-sm">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    placeholder="Enter password"
                    className="p-3 border border-gray-300 rounded-lg text-sm w-full pr-10"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  >
                    {showPassword ? "👁" : "👁️‍🗨️"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-indigo-600"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Remember me
                  </label>
                  <a href="/forgetpassword" className="text-indigo-600 hover:underline">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg mt-2"
                >
                  Login
                </button>

                <p className="text-center text-sm mt-4">
                  Don't have an account?{" "}
                  <a href="/register" className="text-indigo-600 hover:underline">
                    Register now
                  </a>
                </p>
              </>
            ) : (
              <>
                <label className="font-medium text-sm">Admin Username</label>
                <input
                  type="text"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="Enter admin ID"
                  className="p-3 border border-gray-300 rounded-lg text-sm"
                />

                <label className="font-medium text-sm">Password</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter password"
                  className="p-3 border border-gray-300 rounded-lg text-sm"
                />

                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg mt-2"
                >
                  Login as Admin
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
