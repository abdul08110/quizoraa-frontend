import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import TopBar from './components/TopBar';
import Login from "./pages/Login";
import Register from "./pages/Registration";
import ContactUS from "./components/ContactUs";
import ForgetPassword from "./components/ForgetPassword";



const App: React.FC = () => (
  <Router>
    <div className="app-container">
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactUS />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

      </Routes>
    </div>
  </Router>
);

export default App;