
'use client';

import { useState } from "react";

type User = {
  id: number;
  name: string;
  password: string;
  email: string;
  isActive?: boolean;
};

const users: User[] = [
  {
    id: 1,
    name: "vera",
    password: "2191$$",
    email: "larvera6@gmail.com",
    isActive: true,
  },
  {
    id: 2,
    name: "peace",
    password: "peace12",
    email: "peacejpnathan@gmail.com",
    isActive: true,
  },
  {
    id: 3,
    name: "jummai",
    password: "jummai$$",
    email: "venzirdaman@gmail.com",
    isActive: true,
  },
  {
    id: 4,
    name: "yilly",
    password: "yilly12",
    email: "yilcitladan@gmail.com",
    isActive: true,
  },
];

const TravelApp: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const foundUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      alert(`Welcome ${foundUser.name}!`);
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div
      className=" relative h-scroll w-full bg-cover bg-center bg-no-repeat flex items-center justify-start"
      style={{
        backgroundImage: "url('/images/newyork.PNG')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Login Card */}
      <div className="relative z-10 ml-6 md:ml-16 lg:ml-24 w-[90%] sm:w-112.5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-30 mt-8">

        {/* Logo and text */}
        <div className="mb-8">
          <h1 className="text-blue-800 text-2xl font-extrabold mb-4">
            JOSDOIT
          </h1>

          <h2 className="text-black text-2xl font-bold leading-tight mb-3">
            Artificial Intelligent Driving Research For The Travel Industry
          </h2>

          <p className="text-gray-500 font-light">
            Welcome back, please login to your account.
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >
          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 px-4 text-black border border-gray-300 border-l-4 border-l-blue-800 rounded-md outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Email Address"
            required
          />

          {/* Password */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-14 px-4 text-black border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Password"
            required
          />

          {/* Remember me + forgot password */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-blue-800"
              />
              Remember me
            </label>

            <button
              type="button"
              className="text-blue-800 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login + Signup */}
          <div className="flex gap-3 mt-3">
            <button
              type="submit"
              className="flex-1 bg-blue-800 text-white h-12 rounded-md font-semibold hover:bg-blue-900 transition"
            >
              Login
            </button>

            <button
              type="button"
              className="flex-1 border-2 border-blue-800 bg-white text-blue-800 h-12 rounded-md font-semibold hover:bg-blue-50 transition"
            >
              Signup
            </button>
          </div>
        </form>

        {/* Social Login */}
        <div className="mt-8">
          <p className="text-center text-gray-500 mb-4">
            Or login with
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 h-10 border border-gray-300 rounded-md text-blue-800 font-bold hover:bg-gray-50"
            >
              Facebook
            </button>

            <button
              type="button"
              className="flex-1 h-10 border border-gray-300 rounded-md text-blue-800 font-bold hover:bg-gray-50"
            >
              LinkedIn
            </button>

            <button
              type="button"
              className="flex-1 h-10 border border-gray-300 rounded-md text-blue-800 font-bold hover:bg-gray-50"
            >
              Google
            </button>
          </div>
        </div>

        {/* Logged in user */}
        {currentUser && (
          <p className="text-center text-green-600 mt-5 font-semibold">
            Logged in as {currentUser.name}
          </p>
        )}
      </div>
      {/*  menu bar */}
      <div className="absolute bottom-0 left-0 z-40 w-full h-12 bg-white/95">
        <section className="flex justify-between flex-row w-full h-12 ">
         <p className="font-bold text-blue-800">USA</p>
         <p className="font-bold text-blue-800">Dudai</p>
         <p className="font-bold text-blue-800">Iraq</p>
         <p className="font-bold text-blue-800">Egypt</p>
         <p className="font-bold text-blue-800">Spain</p>
         <p className="font-bold text-blue-800">China</p>
         <p className="font-bold text-blue-800">Ghana</p>
         <p className="font-bold text-blue-800">Nigeria</p>
         <p className="font-bold text-blue-800">canada</p>
         <p className="font-bold text-blue-800">London</p>
       
        
        </section>
    </div>
    </div>
  );
};

export default TravelApp;

