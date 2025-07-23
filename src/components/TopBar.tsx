import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const TopBar: React.FC = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
    localStorage.removeItem("rememberMe");
    navigate("/login");
  };

  return (
    <header className="topbar flex justify-between items-center p-4 bg-white shadow">
      <div className="logo text-xl font-bold text-white">QUIZORAA</div>

      <nav className="flex gap-4 text-sm text-gray-700">
        <Link to="/">Home</Link>
        <Link to="/how-it-works">How It Works</Link>
         {isLoggedIn ? (
          <>
           <Link to="/leaderboard">Leaderboard</Link>
          </>
        ) : (
          <>
            
          </>
        )}
        <Link to="/rewards">Rewards</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div className="auth-buttons flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <Link to="/login"><button className="text-sm text-indigo-600">Login</button></Link>
            <Link to="/register"><button className="text-sm text-indigo-600">Register</button></Link>
          </>
        ) : (
          <>
            
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default TopBar;
