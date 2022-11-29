import Image from "next/image"
import React, { useState } from "react"
import renderHtml from "react-render-html"
import moment from "moment"
import { useGlobalContext } from "../../context"
import { useRouter } from "next/router"
import { imageSource } from "../../functions"
import CommentCard from "./CommentCard"
const PostList = ({
  post,
  handleDelete,
  handleLike,
  handleUnLike,
  handleComment,
  visible,
  setVisible,
  currentPost,
  comment,
  setComment,
  addComment,
  newsFeed,
}) => {
  const router = useRouter()

  const { state } = useGlobalContext()

  //console.log(user)
  const { _id, content, updatedAt, image, postedBy, createdAt, comments } = post
  const [openComments, setOpenComments] = useState(false)
  return (
    <div className="fex flex-col items-center justify-center space-y-2 border rounded-md p-1">
      <div className="flex flex-col items-start md:justify-between md:items-center rounded-lg shadow-md md:flex-row md:max-w-full hover:bg-black/75 overflow-hidden relative w-full ">
        <div className="flex flex-col md:flex-row w-full h-full">
          {image && (
            <img
              className="object-cover w-full h-full md:w-[280px] md:h-[260px] rounded-t-lg md:rounded-none md:rounded-l-lg overflow-hidden"
              src={image?.url}
              alt="imageUpload"
            />
          )}
          <div className="flex flex-col items-start md:justify-start p-4 leading-normal">
            <div className="flex space-x-2 items-center mb-4">
              <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                {postedBy?.image ? (
                  <img
                    className="w-8 h-8 rounded"
                    src={postedBy.image.url}
                    alt="image preview"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="font-medium text-gray-900 uppercase text-xl">
                    {postedBy?.name[0]}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <h5 className="text-2xl font-bold tracking-tight ">
                  {postedBy.name}
                </h5>
                <span className="text-xs text-gray-500">
                  {moment(createdAt).fromNow()}
                </span>
              </div>
            </div>

            <div className="mb-3 font-normal">{renderHtml(content)}</div>
          </div>
        </div>
        <ul className="flex flex-row md:flex-col justify-around items-center p-0.5 w-full md:w-fit md:h-[260px] rounded-sm md:space-y-3 bg-gray-300 text-black">
          {/* Edit Icon */}

          {state && state?.user?.name === postedBy?.name && (
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 hover:text-amber-500"
                onClick={() => {
                  router.push(`/user/post/${_id}`)
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </li>
          )}

          {/* Like/unlike Icon */}
          <li className="flex flex-row md:flex-col space-x-2 md:space-y-2 px-2 items-center md:justify-center ">
            {!post?.likes?.includes(state?.user?._id) ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 hover:text-amber-500"
                onClick={() => handleLike(_id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 hover:text-amber-500"
                onClick={() => handleUnLike(_id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                />
              </svg>
            )}
            <kbd className="px-2 py-1.5 text-xs font-semibold  border rounded-lg bg-blue-400 text-gray-100 border-gray-500">
              {post?.likes?.length}
            </kbd>
          </li>
          {/* Comment icon */}
          <li className="flex flex-row md:flex-col space-x-2 md:space-y-2 px-2 items-center md:justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:text-amber-500"
              onClick={() => handleComment(post)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>
            <kbd
              className="px-2 py-1.5 text-xs font-semibold  border rounded-lg bg-blue-400 text-gray-100 border-gray-500 cursor-pointer"
              onClick={() => setOpenComments(true)}
            >
              {post?.comments?.length}
            </kbd>
          </li>
          {/* Delete Icon */}

          {state && state?.user?.name === postedBy?.name ? (
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 hover:text-amber-500"
                onClick={() => handleDelete(_id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </li>
          ) : (
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 hover:text-amber-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                />
              </svg>
            </li>
          )}
        </ul>
        {/* Comment Form */}
        {currentPost._id === _id && visible && (
          <div
            className="absolute w-full h-full flex items-center justify-center bg-black/75"
            onClick={() => setVisible(false)}
          >
            <form className="w-full px-4" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <div className="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
                  <label htmlFor="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows={4}
                    className="px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value)
                    }}
                  />
                </div>
                <div className="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
                  <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    onClick={addComment}
                  >
                    Post comment
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        {openComments && (
          <div
            className="absolute w-full h-full flex flex-col items-center justify-start bg-black/75 overflow-y-scroll p-4"
            onClick={() => setOpenComments(false)}
          >
            {comments?.map((comment, index) => (
              <CommentCard
                key={index}
                comment={comment}
                post={post}
                newsFeed={newsFeed}
              />
            ))}
          </div>
        )}
      </div>
      {!openComments &&
        comments
          ?.slice(0, 1)
          .map((comment, index) => (
            <CommentCard
              key={index}
              comment={comment}
              post={post}
              newsFeed={newsFeed}
            />
          ))}
    </div>
  )
}

export default PostList
