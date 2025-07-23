import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="logo">BrainBattle</div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/leaderboard">Leaderboard</Link>
                <Link to="/registration">Register</Link>
                <Link to="/previous-winners">Previous Winners</Link>
            </nav>
            <div className="auth-buttons">
                <button>Login</button>
                <button>Register</button>
            </div>
        </div>
    );
};

export default Sidebar;