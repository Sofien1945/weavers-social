import { useState } from "react"
import { Layout } from "../components"
import axios from "axios"
import { toast } from "react-toastify"
import AuthForm from "../components/forms/AuthForm"
import Link from "next/link"
import { useRouter } from "next/router"
import { useGlobalContext } from "../context"

export default function login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { state, setState } = useGlobalContext()
  const handleSubmitt = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.post(`/login`, {
        email,
        password,
      })
      //console.log(data)
      if (data.error) {
        toast.error(data.error)
        router
        setLoading(false)
      } else {
        setState({
          user: data.user,
          token: data.token,
        })
        //Save in Local Storage
        window.localStorage.setItem("auth", JSON.stringify(data))
        setEmail("")
        setPassword("")
        setLoading(false)
      }
      router.push("/user/dashboard")
    } catch (error) {
      toast.error(error)
      setLoading(false)
    }
  }
  if (state && state.token) {
    router.push("/user/dashboard")
  }
  return (
    <Layout title="Login">
      <div className="relative flex flex-col items-center justify-center bg-white w-fit p-4 space-y-4">
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-amber-500 to-white blur-md" />
        <h1 className="relative font-semibold underline text-black text-xl mb-10">
          Login
        </h1>
        <AuthForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmitt={handleSubmitt}
          loading={loading}
          login
        />
        <div>
          <p className="text-black">
            Not yet registered ?{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              <Link href="/register">Sign Up</Link>
            </span>
          </p>
        </div>
        <div>
          <p className="text-black">
            Forgot Password ?{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              <Link href="/forgotPassword">Reset</Link>
            </span>
          </p>
        </div>
      </div>
    </Layout>
  )
}
