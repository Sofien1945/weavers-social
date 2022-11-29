import Link from "next/link"
import React from "react"

const AuthForm = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  handleSubmitt,
  ok,
  setOk,
  loading,
  username,
  setUsername,
  about,
  setAbout,
  login,
  profile,
}) => {
  return (
    <>
      <form className="relative flex flex-col space-y-8">
        {profile && (
          <>
            <div className="flex justify-between">
              <label className="text-black">Username</label>
              <input
                type="text"
                value={username}
                placeholder="Enter your Username"
                className="border border-gray-500 px-2 w-72 rounded text-black"
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />
            </div>
            <div className="flex justify-between">
              <label className="text-black">About</label>
              <input
                type="text"
                value={about}
                placeholder="Tell us more"
                className="border border-gray-500 px-2 w-72 rounded text-black"
                onChange={(e) => {
                  setAbout(e.target.value)
                }}
              />
            </div>
          </>
        )}
        {!login && (
          <div className="flex justify-between">
            <label className="text-black">Name</label>
            <input
              type="text"
              value={name}
              placeholder="Enter your name"
              className="border border-gray-500 px-2 w-72 rounded text-black"
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </div>
        )}
        <div className="flex justify-between">
          <label className="text-black">E-mail</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your E-mail address"
            className="border border-gray-500 px-2 w-72 rounded text-black disabled:text-gray-500 disabled:cursor-none"
            onChange={(e) => setEmail(e.target.value)}
            disabled={profile}
          />
        </div>
        <div className="flex justify-between">
          <label className="text-black">Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your Password"
            className="border border-gray-500  px-2 w-72 rounded text-black"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        {!login && (
          <div>
            <small className="text-black">
              Select a question to reset your password
            </small>
            <div className="flex justify-between space-x-2">
              <small className="font-semibold text-md">
                <label className="text-black text-md">Pick a question</label>
              </small>
              <select className="border rounded w-72 text-black border-black">
                <option>What is your favorite color</option>
                <option>What is your best friend name</option>
                <option>What city you were born</option>
              </select>
            </div>
          </div>
        )}
        <div className="flex flex-col space-y-4">
          {!login && (
            <input
              type="text"
              value={secret}
              placeholder="Write your answer here"
              className="border border-gray-500 rounded px-2 text-black"
              onChange={(e) => setSecret(e.target.value)}
            />
          )}
          <button
            className="px-8 py-2 bg-gradient-to-br from-amber-500 to-purple-200 rounded-full hover:translate-y-1 duration-200 active:bg-slate-800 disabled:cursor-none disabled:translate-y-0 disabled:bg-gradient-to-br disabled:from-slate-900 disabled:to-slate-500"
            onClick={handleSubmitt}
            disabled={
              login
                ? !email || !password
                : profile
                ? !username || !about || !name || !email || !password || !secret
                : !name || !email || !secret || !password
            }
          >
            {login ? "Login" : profile ? "Update" : "Sign Up"}
          </button>
        </div>
      </form>
      {ok && (
        <div className="absolute w-full h-full bg-black/40">
          <div className="absolute bg-white top-5 right-5 border border-black rounded flex flex-col p-4">
            <h2 className="font-bold leading-10 text-black">Congratulation</h2>
            <p className="text-black">Thank your for your registration</p>
            <div className="flex space-x-3">
              <Link href="/login">
                <button className="px-8 py-2 bg-gradient-to-br from-amber-500 to-purple-200 rounded-full hover:translate-y-1 duration-200 mt-4">
                  Log In
                </button>
              </Link>
              <button
                className="px-8 py-2 border bg-gray-500 rounded-full hover:translate-y-1 duration-200 mt-4"
                onClick={() => setOk(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="absolute bg-black/75 flex justify-center items-center w-[450px] h-[400px] ">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-20 h-20 text-white animate-spin dark:text-white fill-amber-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="flex justify-center items-center text-stone-50">
              Loading...
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default AuthForm
