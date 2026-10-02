
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  password: string;
  email: string;
  isActive?: boolean;
};

/*
  DEFAULT USERS
  These are the users that already existed in your application.
*/
const defaultUsers: User[] = [
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  /*
    LOGIN FUNCTION
  */

const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const enteredEmail = email.trim().toLowerCase();
  const enteredPassword = password.trim();

  /*
    GET USERS CREATED THROUGH SIGNUP
  */
  const savedUsers = localStorage.getItem("users");

  let registeredUsers: User[] = [];

  if (savedUsers) {
    try {
      const parsedUsers = JSON.parse(savedUsers);

      if (Array.isArray(parsedUsers)) {
        registeredUsers = parsedUsers;
      }
    } catch {
      registeredUsers = [];
    }
  }

  /*
    COMBINE DEFAULT USERS + SIGNED-UP USERS
  */
  const allUsers = [
    ...defaultUsers,
    ...registeredUsers,
  ];

  /*
    FIND USER
  */
  const foundUser = allUsers.find(
    (user) =>
      user.email.trim().toLowerCase() === enteredEmail &&
      user.password === enteredPassword &&
      user.isActive !== false
  );

  /*
    USER NOT FOUND
  */
  if (!foundUser) {
    alert(
      "User does not exist or the password is incorrect. Please sign up first."
    );

    return;
  }

  /*
    USER FOUND
  */
  setCurrentUser(foundUser);

  localStorage.setItem(
    "loggedInUser",
    JSON.stringify(foundUser)
  );

  alert(`Welcome ${foundUser.name}!`);

  router.push("/products");
};


  /*
    CHECK IF SOMEONE IS ALREADY LOGGED IN
  */
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");

    if (savedUser) {
      try {
        const user: User = JSON.parse(savedUser);
        setCurrentUser(user);
      } catch {
        localStorage.removeItem("loggedInUser");
      }
    }
  }, []);

  return (
    <>
      <div className="relative min-h-screen overflow-hidden flex justify-between items-center">

        {/*  LOGIN SIDE */}
        <div className="h-screen w-1/2 bg-white">

          {/* LOGIN SECTION */}
          <div className="relative z-20 min-h-screen flex items-center justify-start pb-16">

            {/* LOGIN CARD */}
            <div
              className="
                ml-6
                md:ml-16
                lg:ml-24
                w-[90%]
                sm:w-112.5
                bg-white
                backdrop-blur-sm
                rounded-2xl
                shadow-2xl
                p-8
                my-8
              "
            >

               {/*LOGO AND DESCRIPTION */}
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

              {/* LOGIN FORM*/}
              <form
                onSubmit={handleLogin}
                className="flex flex-col gap-4"
              >

                {/* EMAIL */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full
                    h-14
                    px-4
                    text-black
                    border
                    border-gray-300
                    border-l-4
                    border-l-blue-800
                    rounded-md
                    outline-none
                    focus:ring-2
                    focus:ring-blue-300
                  "
                  placeholder="Email Address"
                  required
                />

                {/* PASSWORD */}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    w-full
                    h-14
                    px-4
                    text-black
                    border
                    border-gray-300
                    rounded-md
                    outline-none
                    focus:ring-2
                    focus:ring-blue-300
                  "
                  placeholder="Password"
                  required
                />

                {/* REMEMBER ME + FORGOT PASSWORD */}
                <div className="flex justify-between items-center text-sm">

                  <label
                    className="
                      flex
                      items-center
                      gap-2
                      text-gray-600
                      cursor-pointer
                    "
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-blue-800"
                    />

                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-blue-800 hover:underline"
                    onClick={() =>
                      alert(
                        "Password recovery will be added later."
                      )
                    }
                  >
                    Forgot password?
                  </button>

                </div>

                {/* LOGIN + SIGNUP BUTTONS */}
                <div className="flex gap-3 mt-3">

                  {/* LOGIN */}
                  <button
                    type="submit"
                    className="
                      flex-1
                      bg-blue-800
                      text-white
                      h-12
                      rounded-md
                      font-semibold
                      hover:bg-blue-900
                      transition
                    "
                  >
                    Login
                  </button>

                  {/* SIGNUP */}
                  <button
                    type="button"
                    onClick={() => router.push("/signup")}
                    className="
                      flex-1
                      border-2
                      border-blue-800
                      bg-white
                      text-blue-800
                      h-12
                      rounded-md
                      font-semibold
                      hover:bg-blue-50
                      transition
                    "
                  >
                    Signup
                  </button>

                </div>

              </form>

              {/*  SOCIAL LOGIN */}
              <div className="mt-8">

                <p className="text-center text-gray-500 mb-4">
                  Or login with
                </p>

                <div className="flex gap-2">

                  {/* FACEBOOK */}
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      flex-1
                      justify-center
                      items-center
                      h-10
                      border
                      border-gray-300
                      rounded-md
                      text-blue-800
                      font-bold
                      hover:bg-gray-50
                    "
                  >
                    Facebook
                  </a>

                  {/* LINKEDIN */}
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      flex-1
                      justify-center
                      items-center
                      h-10
                      border
                      border-gray-300
                      rounded-md
                      text-blue-800
                      font-bold
                      hover:bg-gray-50
                    "
                  >
                    LinkedIn
                  </a>

                  {/* GOOGLE */}
                  <a
                    href="https://www.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      flex-1
                      justify-center
                      items-center
                      h-10
                      border
                      border-gray-300
                      rounded-md
                      text-blue-800
                      font-bold
                      hover:bg-gray-50
                    "
                  >
                    Google
                  </a>

                </div>

              </div>

              {/* LOGGED IN USER */}
              {currentUser && (
                <p className="text-center text-green-600 mt-5 font-semibold">
                  Logged in as {currentUser.name}
                </p>
              )}

            </div>
          </div>
        </div>

        {/* BACKGROUND IMAGE */}
        <div
          style={{
            backgroundImage: "url('/images/newyork.PNG')",
          }}
          className="
            h-screen
            w-1/2
            inset-0
            bg-cover
            bg-center
            bg-no-repeat
          "
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        {/* BOTTOM COUNTRY MENU */}
        <div
          className="
            absolute
            bottom-0
            left-0
            z-40
            w-full
            h-14
            bg-white/95
            backdrop-blur-md
            shadow-lg
          "
        >

          <section
            className="
              flex
              justify-between
              items-center
              w-full
              h-full
              overflow-x-auto
            "
          >

            {/* USA */}
            <a
              href="https://www.visittheusa.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                justify-center
                items-center
                font-bold
                text-blue-700
                px-4
                whitespace-nowrap
                hover:bg-blue-50
                h-full
              "
            >
              USA
            </a>

            {/* DUBAI */}
            <a
              href="https://www.visitdubai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                justify-center
                items-center
                font-bold
                text-blue-700
                px-4
                whitespace-nowrap
                hover:bg-blue-50
                h-full
              "
            >
              Dubai
            </a>

            {/* IRAQ */}
            <a
              href="https://visit-iraq.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                justify-center
                items-center
                font-bold
                text-blue-700
                px-4
                whitespace-nowrap
                hover:bg-blue-50
                h-full
              "
            >
              Iraq
            </a>

            {/* EGYPT */}
            <a
              href="https://www.experienceegypt.eg/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                justify-center
                items-center
                font-bold
                text-blue-700
                px-4
                whitespace-nowrap
                hover:bg-blue-50
                h-full
              "
            >
              Egypt
            </a>

            {/* SPAIN */}
            <a
              href="https://www.spain.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                justify-center
                items-center
                font-bold
                text-blue-700
                px-4
                whitespace-nowrap
                hover:bg-blue-50
                h-full
              "
            >
              Spain
            </a>

            {/* CHINA */}
            <a
              href="https://www.travelchina.org.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                justify-center
                items-center
                font-bold
                text-blue-700
                px-4
                whitespace-nowrap
                hover:bg-blue-50
                h-full
              "
            >
              China
            </a>

            {/* GHANA */}
            <a
              href="https://visitghana.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                justify-center
                items-center
                font-bold
                text-blue-700
                px-4
                whitespace-nowrap
                hover:bg-blue-50
                h-full
              "
            >
              Ghana
            </a>

            {/* NIGERIA */}
            <a
              href="https://tourism.gov.ng/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                justify-center
                items-center
                font-bold
                text-blue-700
                px-4
                whitespace-nowrap
                hover:bg-blue-50
                h-full
              "
            >
              Nigeria
            </a>

            {/* CANADA */}
            <a
              href="https://travel.destinationcanada.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                justify-center
                items-center
                font-bold
                text-blue-700
                px-4
                whitespace-nowrap
                hover:bg-blue-50
                h-full
              "
            >
              Canada
            </a>

            {/* LONDON */}
            <a
              href="https://www.visitlondon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                justify-center
                items-center
                font-bold
                text-blue-700
                px-4
                whitespace-nowrap
                hover:bg-blue-50
                h-full
              "
            >
              London
            </a>

          </section>
        </div>

      </div>
    </>
  );
};

export default TravelApp;

