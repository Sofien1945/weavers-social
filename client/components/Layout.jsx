import Head from "next/head"
import { Navbar, Footer } from "./"

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{`Weavers - ${title}`}</title>
        <meta
          name="description"
          content="Weavers is new Tunisian Startup in ConTech Industry"
        />
        <meta property="og:description" content="website" />
        <meta
          property="og:type"
          content="Weavers is new Tunisian Startup in ConTech Industry"
        />
        <meta property="og:site_name" content="Weavers" />
        <meta property="og:url" content="http://weavers.vercel.app" />
        <meta
          property="og:image:secure_url"
          content="http://weavers.vercel.app/images/futureart.jpg"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen justify-between container-none bg-slate-900">
        <Navbar />
        <main className="flex justify-center p-4">{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
