import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaRocket, FaChartLine, FaHome } from "react-icons/fa";

const Sidebar = ({ setSidebarOpen }) => {
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/home", icon: <FaHome className="text-cyan-400" /> },
    { name: "Detection", path: "/detection", icon: <FaRocket className="text-cyan-400" /> },
    { name: "Prediction", path: "/predection", icon: <FaChartLine className="text-cyan-400" /> },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-white/5 backdrop-blur-sm border-r border-white/20 shadow-lg flex flex-col justify-between p-4">

  
      <div className="flex items-center gap-3 mb-8">
        <FaHome className="text-cyan-400 text-2xl" />
        <span className="text-white font-bold text-xl">Dashboard</span>
      </div>
 
      <div className="flex-1 flex flex-col gap-3">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 transition hover:bg-white/20 text-white ${
                isActive ? "bg-white/20 font-bold shadow-md" : "font-medium"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

   
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 p-3 mt-6 bg-red-500/30 hover:bg-red-500/50 text-white font-semibold transition shadow-md"
      >
        <FaSignOutAlt />
        Logout
      </button>

    
      <button
        onClick={() => setSidebarOpen(false)}
        className="absolute top-4 right-4 text-white text-lg p-1 hover:bg-white/20 transition"
      >
        ✕
      </button>
    </div>
  );
};

export default Sidebar;
