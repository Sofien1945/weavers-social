import { useState } from "react"
import { Layout } from "../components"
import axios from "axios"
import { toast } from "react-toastify"
import ForgotNewPasswordForm from "../components/forms/ForgotNewPasswordForm"
import Link from "next/link"
import { useGlobalContext } from "../context"
import { useRouter } from "next/router"

export default function forgotPassword() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [secret, setSecret] = useState("")
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)
  const { state } = useGlobalContext()

  const handleSubmitt = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(`/forgot-password`, {
        email,
        newPassword,
        secret,
      })

      if (data.error) {
        toast.error(data.error)
        setLoading(false)
      }

      if (data.success) {
        toast.success(data.success)
        setEmail("")
        setNewPassword("")
        setSecret("")
        setLoading(false)
        setOk(true)
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  if (state && state.token) {
    return <></>
  }
  return (
    <Layout title="Register">
      <div className="relative flex flex-col items-center justify-center bg-white w-fit p-4 space-y-4">
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-amber-500 to-white blur-md" />
        <h1 className="relative font-semibold underline text-black text-xl mb-10">
          Reset Password
        </h1>
        <ForgotNewPasswordForm
          email={email}
          setEmail={setEmail}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          secret={secret}
          setSecret={setSecret}
          ok={ok}
          setOk={setOk}
          handleSubmitt={handleSubmitt}
          loading={loading}
        />
      </div>
    </Layout>
  )
}
