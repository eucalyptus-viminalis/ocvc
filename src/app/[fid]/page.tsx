import { Frame } from "frames.js";
import { appConfig } from "../appConfig";
import { FrameContainer } from "frames.js/next/server";
import { fetchMetadata } from "frames.js/next";

export async function generateMetadata({
    params,
}: {
    params: { fid: string };
}) {
    const { fid } = params;
    console.log('fid', fid);
    const url = new URL(
        "/" + fid.toString() + "/frame",
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
    params: { fid: string };
}) {
    const { fid } = params;
    // const image = appConfig.host + '/' + fname + '/image'
    return (
        <>
            <h1>{fid}</h1>
        </>
    );
}
