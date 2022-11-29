import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Layout } from "../../../components"
import axios from "axios"
import { toast } from "react-toastify"
import UserRoute from "../../../components/routes/UserRoute"
import CreatePostForm from "../../../components/forms/CreatePostForm"

const EditPost = () => {
  const router = useRouter()
  const { postId } = router.query

  const [post, setPost] = useState({})
  const [content, setContent] = useState("")
  const [image, setImage] = useState({})
  const [uploading, setUploading] = useState(false)

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-posts/${postId}`)
      setPost(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (postId) {
      fetchPost()
    }
  }, [postId])

  const postSubmitt = async (e) => {
    e.preventDefault()
    setUploading(true)
    try {
      const { data } = await axios.put(`/update-post/${postId}`, {
        content,
        image,
      })
      if (data.error) {
        toast.error(data.error)
        setUploading(false)
      } else {
        //console.log(data)
        toast.success("Post Updated")
        router.push("/user/dashboard")
        setUploading(false)
      }
    } catch (error) {
      toast.error(data.error)
      setUploading(false)
    }
  }
  const handleImage = async (e) => {
    const file = e.target.files[0]
    let formData = new FormData()
    formData.append("image", file)
    // console.log([...formData]);
    setUploading(true)
    try {
      const { data } = await axios.post("/upload-image", formData)
      // console.log("uploaded image => ", data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      })
      setUploading(false)
    } catch (err) {
      console.log(err)
      setUploading(false)
    }
  }

  return (
    <Layout title="Update Post">
      <UserRoute>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="col-span-1">
            <p>Update The Post</p>
          </div>
          <div className="col-span-2 space-y-4">
            <CreatePostForm
              content={content}
              postSubmitt={postSubmitt}
              setContent={setContent}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
          </div>
        </div>
      </UserRoute>
    </Layout>
  )
}

export default EditPost
