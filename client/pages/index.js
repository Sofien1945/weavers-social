import Head from "next/head"
import Image from "next/image"
import { Layout } from "../components"
import axios from "axios"
import PostList from "../components/cards/PostList"
import moment from "moment"
import renderHTML from "react-render-html"
import io from "socket.io-client"
import { useGlobalContext } from "../context"
import { useEffect, useState } from "react"

const socket = io(
  process.env.NEXT_PUBLIC_SOCKETIO,
  { path: "socket.io" },
  {
    reconnection: true,
  }
)

export default function Home({ posts }) {
  //console.log(posts)
  const { state, setState } = useGlobalContext()
  const [newsFeed, setNewsFeed] = useState([])
  useEffect(() => {
    socket.on("new-post", (newPost) => {
      setNewsFeed([newPost, ...posts])
    })
  }, [])

  const collection = newsFeed.length > 0 ? newsFeed : posts
  console.log(collection)
  return (
    <Layout title="Landing">
      <div className="flex flex-col w-full h-full  justify-between">
        <div className="flex flex-col w-full h-[80vh] relative items-center justify-center">
          <img
            src="/images/futureart.jpg"
            alt="backgroud-image"
            className="absolute object-cover w-full h-3/4 rounded-lg"
          />
          <h2 className="relative text-6xl font-bold text-black">
            Weavers{" "}
            <span className="relative text-3xl font-semibold text-cyan-800">
              Network
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {collection &&
            collection.map((post, index) => {
              const {
                _id,
                content,
                updatedAt,
                image,
                postedBy,
                createdAt,
                comments,
              } = post
              return (
                <div
                  className="flex flex-col md:flex-row w-full h-full border rounded overflow-hidden"
                  key={_id}
                >
                  {image && (
                    <img
                      className="object-cover w-full h-full md:w-[280px] md:h-[260px] md:rounded-none overflow-hidden"
                      src={image?.url}
                      alt="imageUpload"
                      referrerPolicy="no-referrer"
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
                          <span className="font-md text-gray-900 uppercase text-xl">
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

                    <div className="mb-3 font-normal">
                      {renderHTML(content)}
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get("/posts")
  //console.log(posts);
  return {
    props: { posts: data },
  }
}
