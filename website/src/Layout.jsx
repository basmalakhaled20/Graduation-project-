import React, { useState } from "react";
import Sidebar from "./pages/Sidebar";
import Navbar from "./pages/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-[#0f172a] via-[#132E35] to-[#020617] text-white overflow-hidden">
      
    
      {sidebarOpen && (
        <div className="w-64 flex-shrink-0 transition-all duration-300">
          <Sidebar setSidebarOpen={setSidebarOpen} />
        </div>
      )}
      

      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
