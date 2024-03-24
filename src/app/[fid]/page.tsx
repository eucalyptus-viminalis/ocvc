import { Frame } from "frames.js";
import { appConfig } from "../appConfig";
import { FrameContainer } from "frames.js/next/server";
import { fetchMetadata } from "frames.js/next";

export async function generateMetadata({
    params,
}: {
    params: { fname: string };
}) {
    const { fname } = params;
    console.log('fname', fname);
    const url = new URL(
        "/" + fname.toString() + "/frame",
        appConfig.host || "http://localhost:3000"
    );
    console.log('url', url);
    return {
        title: "ocvc",
        // provide full URL to your /frames endpoint
        other: {
            ...(await fetchMetadata(
              url
            )),
        },
    };
}

export default function UserRootPage({
    params,
}: {
    params: { fname: string };
}) {
    const { fname } = params;
    // const image = appConfig.host + '/' + fname + '/image'
    return (
        <>
            <h1>{fname}</h1>
        </>
    );
}
