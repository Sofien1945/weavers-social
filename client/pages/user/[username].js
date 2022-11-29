import React, { useState } from "react"
import { Layout } from "../../components"
import Router, { useRouter } from "next/router"
import { useGlobalContext } from "../../context"
import { useEffect } from "react"
import axios from "axios"
import UserRoute from "../../components/routes/UserRoute"

const username = () => {
  const router = useRouter()
  const { username } = router.query
  const { state, setState } = useGlobalContext()
  const [user, setUser] = useState({})

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/search-user/${username}`)
      setUser(data[0])
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])

  const hundleUnfollow = async (userId) => {
    try {
      const { data } = await axios.put("/user-unfollow", { _id: userId })
      let auth = JSON.parse(localStorage.getItem("auth"))
      auth.user = data
      console.log(data)
      localStorage.setItem("auth", JSON.stringify(auth))
      setState({ ...state, user: data })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout title={username}>
      <UserRoute>
        <div className="py-3 px-4 sm:py-4 flex flex-col items-center justify-center space-y-4 rounded border">
          <div className="flex-shrink-0">
            <img
              className="w-10 h-10 rounded-full"
              src={user?.image ? user?.image?.url : "/images/logo-weavers.png"}
              alt="username"
            />
          </div>
          <p className="text-sm font-medium truncate text-white">
            {user?.username}
          </p>
          <p className="text-sm text-gray-500 truncate ">{user?.email}</p>
          <div className="flex justify-between items-center space-x-4">
            <p className="text-sm text-white truncate ">
              {user?.following?.length} Following
            </p>
            <p className="text-sm text-white truncate ">
              {user?.followers?.length} Followers
            </p>
          </div>

          <div className="inline-flex items-center text-base shrink">
            <button
              className="px-5 py-1 rounded-full bg-blue-300 hover:bg-blue-700"
              onClick={() => hundleUnfollow(user?._id)}
            >
              {state?.user?._id !== user?._id ? "Unfollow" : "Home"}
            </button>
          </div>
        </div>
      </UserRoute>
    </Layout>
  )
}

export default username
