
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  password: string;
  email: string;
  isActive?: boolean;
};

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignup = () => {
    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Check empty fields
    if (!cleanName || !cleanEmail || !cleanPassword) {
      setError("All fields are required");
      return;
    }

    // Check email
    if (!cleanEmail.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    // Check password
    if (cleanPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    /*
      GET USERS ALREADY SAVED IN LOCAL STORAGE
    */
    const savedUsers = localStorage.getItem("users");

    let users: User[] = [];

    if (savedUsers) {
      try {
        const parsedUsers = JSON.parse(savedUsers);

        if (Array.isArray(parsedUsers)) {
          users = parsedUsers;
        }
      } catch {
        users = [];
      }
    }

    /*
      CHECK IF EMAIL ALREADY EXISTS
    */
    const userAlreadyExists = users.some(
      (user) =>
        user.email.trim().toLowerCase() === cleanEmail
    );

    if (userAlreadyExists) {
      setError(
        "An account with this email already exists. Please login."
      );
      return;
    }

    /*
      CREATE NEW USER
    */
    const newUser: User = {
      id: Date.now(),
      name: cleanName,
      email: cleanEmail,
      password: cleanPassword,
      isActive: true,
    };

    /*
      ADD NEW USER TO THE EXISTING USERS
    */
    users.push(newUser);

    /*
      SAVE ALL USERS
      THIS IS THE IMPORTANT PART
    */
    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    /*
      Confirm that the user was saved
    */
    alert(`Account created for ${cleanName}!`);

    /*
      Go back to login
    */
    router.push("/lanhub-ass2");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">

      <div className="w-95 p-6">

        <h1 className="text-3xl font-bold">
          Create Account
        </h1>

        <p className="text-sm text-gray-500 mt-6 mb-4">
          Already have an account?{" "}
          <Link
            className="underline text-black"
            href="/lanhub-ass2"
          >
            Then Login
          </Link>
        </p>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* NAME */}
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-4 py-3 rounded-xl mb-4"
        />

        {/* EMAIL */}
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-3 rounded-xl mb-4"
        />

        {/* PASSWORD */}
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-3 rounded-xl mb-4"
        />

        {/* SIGN UP */}
        <button
          onClick={handleSignup}
          className="w-full bg-black py-3 rounded-full text-white hover:bg-gray-800 transition"
        >
          Sign Up
        </button>

      </div>
    </div>
  );
}

