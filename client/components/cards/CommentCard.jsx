import axios from "axios"
import moment from "moment"
import React from "react"
import { useGlobalContext } from "../../context"

const CommentCard = ({ comment, post, newsFeed }) => {
  const { state } = useGlobalContext()
  const removeComment = async () => {
    try {
      const { data } = await axios.put("remove-comment", {
        comment: comment,
        post: post,
      })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <article
      className="p-4 mb-4 text-base bg-white rounded-lg w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src={comment?.postedBy?.image?.url}
              alt="postedBy"
            />
            {comment?.postedBy?.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {moment(comment.created).fromNow()}
          </p>
        </div>
        {state?.user?._id === comment?.postedBy?._id && (
          <button
            id="deleteButton"
            data-dropdown-toggle="dropdownComment1"
            className="inline-flex items-center text-sm font-medium text-center text-gray-400 bg-white rounded-lg focus:ring-4 focus:outline-none focus:ring-gray-50 hover:bg-blue-300 dark:focus:ring-gray-600 p-2"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-black"
              onClick={() => {
                //console.log(comment)
                removeComment()
                newsFeed()
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </button>
        )}
      </div>
      <p className="text-gray-500 dark:text-gray-400">{comment?.text}</p>
    </article>
  )
}

export default CommentCard
