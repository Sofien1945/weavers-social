import moment from "moment"
import { useGlobalContext } from "../../context"
import { useRouter } from "next/router"
import Link from "next/link"

const People = ({ people, handleFollow, handleUnfollow }) => {
  const { username, name, image, email, _id } = people
  const { state } = useGlobalContext()
  const router = useRouter()

  return (
    <li className="py-3 px-4 sm:py-4 flex justify-between w-full overflow-hidden">
      <Link href={`/user/${username}`}>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img
              className="w-10 h-10 rounded-full"
              src={image ? image?.url : "/images/logo-weavers.png"}
              alt="username"
              //onClick={router.push(`/user/${username}`)}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-white cursor-pointer hover:underline hover:text-blue-600">
              {username.length >= 8 ? username.slice(0, 8) : username}
            </p>
            <p className="text-sm text-gray-500 truncate ">{email}</p>
          </div>
        </div>
      </Link>
      <div className="inline-flex items-center text-base shrink">
        <button
          className="px-5 py-1 rounded-full bg-blue-300 hover:bg-blue-700"
          onClick={() => {
            console.log(state?.user?.following?.includes(_id))
            state?.user?._id === _id
              ? router.push("/user/profile/update")
              : state?.user?.following?.includes(_id)
              ? handleUnfollow(_id)
              : handleFollow(_id)
          }}
        >
          {state?.user?._id === _id
            ? "You"
            : state?.user?.following.includes(_id)
            ? "Unfollow"
            : "Follow"}
        </button>
      </div>
    </li>
  )
}

export default People
