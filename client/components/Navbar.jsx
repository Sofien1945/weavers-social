import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useGlobalContext } from "../context"

const Navbar = () => {
  const [current, setCurrent] = useState("")
  const [topdown, setTopdown] = useState(false)
  const { state, setState } = useGlobalContext()
  const router = useRouter()

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname)
  }, [process.browser && window.location.pathname])

  const logout = () => {
    window.localStorage.removeItem("auth")
    setState(null)
    router.push("/")
  }
  return (
    <div className="container-non border-b border-white/50 sticky top-0 flex justify-around py-2 px-2 items-center backdrop-filter backdrop-blur-lg bg-opacity-30 z-40">
      <div className="flex items-center justify-center space-x-2">
        <Image
          src="/images/logo-weavers.png"
          height={50}
          width={50}
          alt="weavers-logo"
        />
        <h2 className="hidden sm:flex text-3xl italic text-white ">Weavers</h2>
      </div>
      <div className="group relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-500 rounded-full blur opacity-80 group-hover:opacity-100 transition duration-500" />
        <nav className="relative flex items-center justify-center space-x-5 md:space-x-8 bg-white rounded-full px-8 md:px-20 py-2 md:py-0.5 text-black">
          <Link href="/">
            <div
              className={`${
                current === "/" ? "bg-gray-300 rounded-sm text-amber-500" : null
              } flex flex-col justify-center items-center hover:text-amber-500 p-0.5`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <h4 className="hidden md:flex">Home</h4>
            </div>
          </Link>

          <Link href="/discover">
            <div className="flex flex-col justify-center items-center hover:text-amber-500 p-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"
                />
              </svg>
              <h4 className="hidden md:flex">Discover</h4>
            </div>
          </Link>
          <Link href="/tender">
            <div className="flex flex-col justify-center items-center hover:text-amber-500 p-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                />
              </svg>

              <h4 className="hidden md:flex">Tender</h4>
            </div>
          </Link>
          <div
            className={`${
              state === null
                ? "hidden"
                : "flex border-2 border-gray-900 rounded pr-0.5"
            }`}
          >
            <Link href="/user/dashboard">
              <div
                className={`flex flex-col justify-center items-center hover:text-amber-500
               ${
                 current === "/user/dashboard"
                   ? " bg-gray-300 rounded-sm text-amber-500"
                   : null
               }  p-0.5`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <h4 className="hidden md:flex">{state && state?.user?.name}</h4>
              </div>
            </Link>
            <div className="flex flex-col items-center justify-center">
              <svg
                className="ml-2 w-6 h-6 hover:text-amber-500"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setTopdown((prev) => !prev)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <h4 className="hidden md:flex">More</h4>
            </div>
          </div>
        </nav>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center w-10 h-10 bg-white text-black rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        </div>
        {state === null ? (
          <>
            <Link href="/register">
              <button
                className={`${
                  current === "/register" ? " bg-amber-900" : " bg-amber-500 "
                } px-4 py-1 rounded-full text-white ml-2`}
              >
                Sign Up
              </button>
            </Link>
            <Link href="/login">
              <button
                className={`${
                  current === "/login"
                    ? " bg-purple-500 text-white"
                    : " bg-gray-200 text-black"
                } px-4 py-1 rounded-full   ml-2`}
              >
                Login
              </button>
            </Link>
          </>
        ) : (
          <button
            className="px-4 py-1 rounded-full bg-amber-500 text-white ml-2 hover:bg-purple-400"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
      <div
        id="dropdown"
        className={`${
          !topdown && "hidden"
        } absolute top-14 right-32 md:right-52 w-fit bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 mt-5 ml-16`}
      >
        <ul
          className="flex flex-row  items center justify-center py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          <li>
            <Link
              href="#"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/user/profile/update"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Earnings
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Edit
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
