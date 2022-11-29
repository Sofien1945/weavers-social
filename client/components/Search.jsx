import React, { useState } from "react"
import { useGlobalContext } from "../context"
import axios from "axios"
import People from "./cards/People"

const Search = ({ handleFollow }) => {
  const { state, setState } = useGlobalContext()
  const [query, setQuery] = useState("")
  const [result, setResult] = useState([])

  const searchUser = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.get(`/search-user/${query}`)
      setResult(data)
      //console.log("User:", data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnfollow = async (userId) => {
    try {
      const { data } = await axios.put("/user-unfollow", { _id: userId })
      console.log(data)
      let auth = JSON.parse(localStorage.getItem("auth"))
      auth.user = data
      localStorage.setItem("auth", JSON.stringify(auth))
      setState({ ...state, user: data })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form className="pb-4">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search People, Posts..."
            required
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setResult([])
            }}
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={searchUser}
          >
            Search
          </button>
        </div>
      </form>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {result &&
          result.map((people, index) => {
            return (
              <People
                key={people._id}
                people={people}
                handleFollow={handleFollow}
                handleUnfollow={handleUnfollow}
              />
            )
          })}
      </ul>
    </div>
  )
}

export default Search
