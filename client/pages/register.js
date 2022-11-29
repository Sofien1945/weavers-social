import { useState } from "react"
import { Layout } from "../components"
import axios from "axios"
import { toast } from "react-toastify"
import AuthForm from "../components/forms/AuthForm"
import Link from "next/link"
import { useGlobalContext } from "../context"
import { useRouter } from "next/router"

export default function register() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [secret, setSecret] = useState("")
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)
  const { state, setState } = useGlobalContext()
  const handleSubmitt = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.post(`/register`, {
        name,
        email,
        password,
        secret,
      })
      if (data.error) {
        toast.error(data.error)
        setLoading(false)
      } else {
        setName("")
        setEmail("")
        setPassword("")
        setSecret("")
        setLoading(false)
        setOk(data.ok)
      }
    } catch (error) {
      toast.error(error.response.data)
      setLoading(false)
    }
  }
  if (state && state.token) {
    router.push("/")
  }
  return (
    <Layout title="Register">
      <div className="relative flex flex-col items-center justify-center bg-white w-fit p-4 space-y-4">
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-amber-500 to-white blur-md" />
        <h1 className="relative font-semibold underline text-black text-xl mb-10">
          Register
        </h1>
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
          ok={ok}
          setOk={setOk}
          loading={loading}
        />
        <div>
          <p className="text-black">
            Already Registered ?,
            <span className="text-blue-600 hover:underline cursor-pointer">
              <Link href="/login">Log In</Link>
            </span>
          </p>
        </div>
      </div>
    </Layout>
  )
}
