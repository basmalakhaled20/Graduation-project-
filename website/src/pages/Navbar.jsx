import React, { useState, useEffect } from "react";
import { FaSearch, FaClock, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onSearch, sidebarOpen, setSidebarOpen }) => {
  const [time, setTime] = useState(new Date());
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pageMap = {
    home: "/home",
   
    login: "/login",
    signup: "/signup",
    predection: "/predection",
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (onSearch) onSearch(value);

    const lower = value.toLowerCase();
    if (pageMap[lower]) navigate(pageMap[lower]);
  };

  return (
    <div className="w-full bg-white/10 backdrop-blur-sm shadow-lg flex items-center justify-between px-6 py-3">
    
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded hover:bg-white/20 transition"
        >
          <FaBars className="text-white text-xl" />
        </button>

        <div className="flex items-center gap-2">
          <FaClock className="text-cyan-400 text-lg" />
          <div>
            <p className="text-white/70 text-xs">Current Time</p>
            <p className="text-white font-semibold text-sm">
              {time.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

     
      <div className="flex items-center gap-4">

      
        <div className="flex items-center bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 w-72 focus-within:ring-2 focus-within:ring-cyan-400 transition shadow-sm">
          <FaSearch className="text-white/70 mr-2" />
          <input
            type="text"
            placeholder="Search pages or data..."
            value={search}
            onChange={handleSearch}
            className="w-full bg-transparent outline-none text-sm text-white placeholder-white/60"
          />
        </div>

         
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm border border-white/20">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <p className="text-white text-sm font-medium">System Active</p>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
