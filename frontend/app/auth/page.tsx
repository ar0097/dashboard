"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
function page() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [tab, setTab] = useState(true);
  const navigate = useRouter();

  const handleTab = () => {
    setTab((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://dashboard-4zxv.onrender.com/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );
      console.log("Login successful!");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate.push("/");
    } catch (err: any) {
      console.log(err.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://dashboard-4zxv.onrender.com/api/auth/register",
        {
          name: form.name,
          email: form.email,
          password: form.password,
        }
      );
      console.log("Registration successful! Please login.");
      setTab(true);
      setForm({ name: "", email: "", password: "" });
    } catch (err: any) {
      console.log(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff] p-4">
      <div className="rounded-lg border bg-[#ffffff] text-[#020817] shadow-sm w-full max-w-md border-[#e2e8f0]">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="tracking-tight text-2xl font-bold text-center">
            Welcome
          </h3>
          <p className="text-sm text-[#64748b] text-center">
            Sign in to your account or create a new one
          </p>
        </div>
        <div className="p-6 pt-0">
          <div className="w-full">
            <div className="h-10 items-center justify-center rounded-md bg-[#f1f5f9] p-1 text-[#64748b] grid w-full grid-cols-2">
              <button
                onClick={handleTab}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-[#ffffff] transition-all ${
                  tab && "bg-[#ffffff] text-[#020817] shadow-sm"
                }`}
              >
                Login
              </button>
              <button
                onClick={handleTab}
                className={`inline-flex items-center justify-center whitespace-nowrap ${
                  !tab && "bg-[#ffffff] text-[#020817] shadow-sm"
                } rounded-sm px-3 py-1.5 text-sm font-medium  ring-offset-[#ffffff] transition-all`}
              >
                Register
              </button>
            </div>
            {tab ? (
              <div className="mt-2 ring-offset-[#ffffff] ">
                <form action="" className="space-y-4" onSubmit={handleLogin}>
                  <div className="space-y-2">
                    <label
                      htmlFor=""
                      className="text-sm font-medium leading-none"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="flex h-10 w-full rounded-md border border-[#e2e8f0] bg-[#ffffff] px-3 py-2 text-base ring-offset-[#ffffff]   placeholder:text-[#64748b]  md:text-sm"
                      placeholder="Enter your email"
                      required
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor=""
                      className="text-sm font-medium leading-none"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="flex h-10 w-full rounded-md border border-[#e2e8f0] bg-[#ffffff] px-3 py-2 text-base ring-offset-[#ffffff]   placeholder:text-[#64748b]  md:text-sm"
                      placeholder="Enter your password"
                      required
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[#ffffff] transition-colors  bg-[#0f172a] text-[#f8fafc] hover:bg-[#0f172ae6] h-10 px-4 py-2 w-full">
                    Sign In
                  </button>
                </form>
              </div>
            ) : (
              <div className="mt-2 ring-offset-[#ffffff] ">
                <form action="" className="space-y-4" onSubmit={handleRegister}>
                  <div className="space-y-2">
                    <label
                      htmlFor=""
                      className="text-sm font-medium leading-none"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="flex h-10 w-full rounded-md border border-[#e2e8f0] bg-[#ffffff] px-3 py-2 text-base ring-offset-[#ffffff]   placeholder:text-[#64748b]  md:text-sm"
                      placeholder="Enter your name"
                      required
                      value={form.name}
                      name="name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor=""
                      className="text-sm font-medium leading-none"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="flex h-10 w-full rounded-md border border-[#e2e8f0] bg-[#ffffff] px-3 py-2 text-base ring-offset-[#ffffff]   placeholder:text-[#64748b]  md:text-sm"
                      placeholder="Enter your email"
                      required
                      value={form.email}
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor=""
                      className="text-sm font-medium leading-none"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="flex h-10 w-full rounded-md border border-[#e2e8f0] bg-[#ffffff] px-3 py-2 text-base ring-offset-[#ffffff]   placeholder:text-[#64748b]  md:text-sm"
                      placeholder="Create password"
                      required
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[#ffffff] transition-colors  bg-[#0f172a] text-[#f8fafc] hover:bg-[#0f172ae6] h-10 px-4 py-2 w-full">
                    Create Account
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
