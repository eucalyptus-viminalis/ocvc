import { Frame } from "frames.js";
import { appConfig } from "../appConfig";
import { FrameContainer } from "frames.js/next/server";
import { fetchMetadata } from "frames.js/next";
import { VibeCheck } from "./VibeCheck";
import { Suspense } from "react";

export async function generateMetadata({
    params,
}: {
    params: { fid: number };
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
    return (
        <>
            <Suspense>
                <VibeCheck fid={+fid}/>
            </Suspense>
        </>
    );
}
