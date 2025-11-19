"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CgUser } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";


interface User {
  id: string;
  name: string;
  email: string;
}

function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate.push("/auth");
  };
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <CgUser className="w-5 h-5 text-gray-600" />
            <div className="text-sm">
              <div className="font-medium text-gray-900">{user?.name}</div>
              <div className="text-gray-500">{user?.email}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center cursor-pointer justify-center whitespace-nowrap text-sm font-medium ring-offset-[#ffffff] transition-colors  border border-[#e2e8f0] bg-[#ffffff] hover:bg-[#f1f5f9] hover:text-[#0f172a] h-9 rounded-md px-3 gap-2"
          >
            <FiLogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
