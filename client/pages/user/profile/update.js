import { useEffect, useState } from "react"
import { Layout } from "../../../components"
import axios from "axios"
import { toast } from "react-toastify"
import AuthForm from "../../../components/forms/AuthForm"
import Link from "next/link"
import { useGlobalContext } from "../../../context"
import { useRouter } from "next/router"

export default function profileUpdate() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [secret, setSecret] = useState("")
  const [username, setUsername] = useState("")
  const [about, setAbout] = useState("")
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)
  const { state, setState } = useGlobalContext()

  //profile image

  const [image, setImage] = useState({})
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (state && state.user) {
      setUsername(state.user.username)
      setAbout(state.user.about)
      setName(state.user.name)
      setEmail(state.user.email)
      setImage(state.user.image)
      //console.log(state)
    }
  }, [state && state.user])

  const handleSubmitt = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.put(`/profile-update`, {
        name,
        email,
        password,
        secret,
        username,
        about,
        image,
      })
      if (data.error) {
        toast.error(data.error)
        setLoading(false)
      } else {
        //toast.success(data.success)
        //setOk(data.ok)
        //Update local storage & keep token
        let auth = JSON.parse(localStorage.getItem("auth"))
        auth.user = data
        localStorage.setItem("auth", JSON.stringify(auth))
        //Update context
        setState({ ...state, user: data })
        setLoading(false)
      }
    } catch (error) {
      toast.error(error)
      setLoading(false)
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
  return (
    <Layout title="Register">
      <div className="relative flex flex-col items-center justify-center bg-white w-fit p-4 space-y-4 my-16">
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-amber-500 to-white blur-md" />
        <h1 className="relative font-semibold underline text-black text-xl mb-10">
          Profile
        </h1>
        {/* Profile Image */}
        <label className="relative grid w-full px-4 text-black justify-items-end">
          {image && image.url ? (
            <img
              className="w-12 h-12 rounded"
              src={image.url}
              alt="image preview"
              referrerPolicy="no-referrer"
            ></img>
          ) : uploading ? (
            <div>
              <svg
                aria-hidden="true"
                className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 p-1 text-black hover:bg-slate-300 rounded"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              />
            </svg>
          )}
          <input
            type="file"
            accept="images/*"
            className="hidden"
            onChange={handleImage}
          />
        </label>
        <AuthForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          secret={secret}
          setSecret={setSecret}
          handleSubmitt={handleSubmitt}
          username={username}
          setUsername={setUsername}
          about={about}
          setAbout={setAbout}
          ok={ok}
          setOk={setOk}
          loading={loading}
          profile
        />
      </div>
    </Layout>
  )
}
