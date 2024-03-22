import { Frame } from "frames.js"
import { appConfig } from "../appConfig"
import { FrameContainer } from "frames.js/next/server"
import { fetchMetadata } from "frames.js/next";
 
export async function generateMetadata({params}: {params: {fname:string}}) {
    const {fname} = params
    console.log(fname)
    const url = new URL('/' + fname.toString() + "/frame", process.env.VERCEL_URL || "http://localhost:3000")
    console.log(url)
    const meta = await fetchMetadata(url)
    console.log(meta)
  return {
    title: "ocvc",
    // provide full URL to your /frames endpoint
    ...(await fetchMetadata(
      new URL('/' + fname + "/frame", process.env.VERCEL_URL || "http://localhost:3000")
    )),
  };
}

export default function UserRootPage({ params }: { params: { fname: string } }) {
    const {fname} = params
    // const image = appConfig.host + '/' + fname + '/image'
    return (
        <>
            <h1>{fname}</h1>
        </>
    )
}