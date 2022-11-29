import React, { useEffect, useState } from "react"
import { Layout } from "../../components"
import UserRoute from "../../components/routes/UserRoute"
import CreatePostForm from "../../components/forms/CreatePostForm"
import { useGlobalContext } from "../../context"
import { useRouter } from "next/router"
import axios from "axios"
import { toast } from "react-toastify"
import PostList from "../../components/cards/PostList"
import People from "../../components/cards/People"
import Link from "next/link"
import Search from "../../components/Search"
import io from "socket.io-client"

const socket = io(
  process.env.NEXT_PUBLIC_SOCKETIO,
  { path: "socket.io" },
  {
    reconnection: true,
  }
)

const dashboard = () => {
  const router = useRouter()
  const { state, setState } = useGlobalContext()
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState("")
  const [image, setImage] = useState({})
  const [uploading, setUploading] = useState(false)
  const [peoples, setPeoples] = useState([])
  const [comment, setComment] = useState("")
  const [visible, setVisible] = useState(false)
  const [currentPost, setCurrentPost] = useState({})
  const [totalPosts, setTotalPosts] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)

  useEffect(() => {
    if (state && state.token) {
      newsFeed()
      findPeople()
      //console.log(pageIndex)
    }
  }, [state && state.token, posts])

  /*useEffect(() => {
    try {
      axios.get("/total-posts").then(({ data }) => setTotalPosts(data))
    } catch (error) {
      console.log(error)
    }
  }, [])*/

  const newsFeed = async () => {
    try {
      const { data } = await axios.get("/news-feed")
      setTotalPosts(data.length)
      setPosts(data)
    } catch (error) {
      console.log(error)
    }
  }
  const findPeople = async () => {
    try {
      const { data } = await axios.get("/find-people")
      if (data.error) {
        console.log(data.error)
      } else {
        setPeoples(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const postSubmitt = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("/create-post", { content, image })
      console.log("Create New Post: ", data, image)
      if (data.error) {
        toast.error(data.error)
      } else {
        toast.success("Post created")
        setContent("")
        setImage(null)
        // Use socket io
        socket.emit("new-post", data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleImage = async (e) => {
    const file = e.target.files[0]
    let formData = new FormData()
    formData.append("image", file)
    //form.append("content", content)
    //console.log([...formData])
    setUploading(true)
    try {
      const { data } = await axios.post("/upload-image", formData)
      setImage({
        url: data.url,
        public_id: data.public_id,
      })
      //console.log(data)
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  const handleDelete = async (postId) => {
    try {
      const answer = window.confirm("Are you sure ?")
      if (!answer) return
      const { data } = await axios.delete(`/delete-post/${postId}`)
      if (data.error) {
        toast.error(data.error)
      } else {
        toast.success(data.success)
        router.push("/user/dashboard")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFollow = async (userId) => {
    try {
      const { data } = await axios.put("/user-follow", { _id: userId })
      //console.log(data)
      // Update localstorage, update user, keep token
      //console.log(data)
      let auth = JSON.parse(localStorage.getItem("auth"))
      auth.user = data
      localStorage.setItem("auth", JSON.stringify(auth))
      setState({ ...state, user: data })
      //console.log(state)
      //update filter state
      let filtered = peoples.filter((p) => {
        p._id !== userId
      })
      setPeoples(filtered)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLike = async (postId) => {
    try {
      const { data } = await axios.put("/like-post", { _id: postId })
      newsFeed()
      //console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnlike = async (postId) => {
    try {
      const { data } = await axios.put("/unlike-post", { _id: postId })
      newsFeed()
      //console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleComment = (post) => {
    setCurrentPost(post)
    setVisible(true)
  }

  const addComment = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put("/add-comment", {
        comment: comment,
        post: currentPost,
      })
      setVisible(false)
      setComment("")
      newsFeed()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout title="Dash">
      <UserRoute>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative">
          <div className="col-span-1 -order-1 p-4 border-2 rounded h-fit w-full">
            <h2 className="font-semibold underline mb-4">Marhaba</h2>
          </div>

          <div className="col-span-3 space-y-4 order-last md:order-2">
            <CreatePostForm
              content={content}
              postSubmitt={postSubmitt}
              setContent={setContent}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
            {posts &&
              posts
                .slice(pageIndex * 3, pageIndex * 3 + 3)
                .map((post, index) => (
                  <PostList
                    key={post._id}
                    post={post}
                    handleDelete={handleDelete}
                    handleLike={handleLike}
                    handleUnLike={handleUnlike}
                    handleComment={handleComment}
                    visible={visible}
                    setVisible={setVisible}
                    currentPost={currentPost}
                    comment={comment}
                    setComment={setComment}
                    addComment={addComment}
                    newsFeed={newsFeed}
                  />
                ))}
            <nav aria-label="Page navigation example">
              <ul className="inline-flex space-x-2">
                <li
                  className="ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-300 hover:text-gray-700 cursor-pointer rounded"
                  onClick={() =>
                    pageIndex === 0
                      ? setPageIndex(0)
                      : setPageIndex(pageIndex - 1)
                  }
                >
                  <button
                    disabled={pageIndex === 0 ? true : false}
                    className="disabled:bg-slate-700 disabled:text-white w-full h-full px-3 py-2 "
                  >
                    Previous
                  </button>
                </li>

                {[
                  ...Array(
                    totalPosts % 3 === 0
                      ? Math.floor(totalPosts / 3)
                      : Math.floor(totalPosts / 3) + 1
                  ),
                ].map((x, index) => (
                  <li
                    key={index}
                    className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-300 hover:text-gray-700 rounded cursor-pointer ${
                      pageIndex === index && "bg-black"
                    }`}
                    onClick={() => setPageIndex(index)}
                  >
                    {index + 1}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="sidebar">
            <Search handleFollow={handleFollow} />
            <Link href={`/user/following`}>
              <h2 className="font-semibold underline mb-4 hover:text-blue-500 cursor-pointer">
                Follow<span> ({state && state?.user?.following?.length})</span>
              </h2>
            </Link>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {peoples.map((people, index) => {
                return (
                  <People
                    key={people._id}
                    people={people}
                    handleFollow={handleFollow}
                  />
                )
              })}
            </ul>
          </div>
        </div>
      </UserRoute>
    </Layout>
  )
}

export default dashboard
