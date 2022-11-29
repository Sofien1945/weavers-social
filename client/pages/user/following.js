import axios from "axios"
import React, { useEffect, useState } from "react"
import { Layout } from "../../components"
import UserRoute from "../../components/routes/UserRoute"
import { useGlobalContext } from "../../context"

const following = () => {
  const [peoples, setPeoples] = useState([])
  const { state, setState } = useGlobalContext()

  useEffect(() => {
    if (state && state?.token) fetchFolowing()
  }, [state && state?.token])

  const fetchFolowing = async () => {
    try {
      const { data } = await axios("/user-following")
      setPeoples(data)
    } catch (error) {
      console.log(error)
    }
  }

  const hundleUnfollow = async (userId) => {
    try {
      const { data } = await axios.put("/user-unfollow", { _id: userId })
      let auth = JSON.parse(localStorage.getItem("auth"))
      auth.user = data
      console.log(data)
      localStorage.setItem("auth", JSON.stringify(auth))
      setState({ ...state, user: data })
      //update filter state
      let filtered = peoples.filter((p) => {
        p._id !== userId
      })
      setPeoples(filtered)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout title="Following">
      <UserRoute>
        <div className="p-4 w-full max-w-md bg-black/75 rounded-lg border shadow-md sm:p-8 ">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-xl font-bold leading-none underline ">
              Following List
            </h5>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {peoples.map((people, index) => {
              const { username, name, image, email, _id } = people

              return (
                <li
                  key={_id}
                  className="py-3 px-4 sm:py-4 flex justify-between w-full overflow-x-auto"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={image ? image?.url : "/images/logo-weavers.png"}
                        alt="username"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-white">
                        {username}
                      </p>
                      <p className="text-sm text-gray-500 truncate ">{email}</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center text-base shrink">
                    <button
                      className="px-5 py-1 rounded-full bg-blue-300 hover:bg-blue-700"
                      onClick={() => hundleUnfollow(_id)}
                    >
                      Unfollow
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </UserRoute>
    </Layout>
  )
}

export default following
