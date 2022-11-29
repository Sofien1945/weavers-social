import { UserProvider } from "../context"
import "../styles/globals.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
