import { Frame, FrameActionPayload, getFrameHtml } from "frames.js";
import { NextRequest } from "next/server";
import { getData } from "./data";
import { appConfig } from "../../appConfig";

export async function GET(
    req: NextRequest,
    { params }: { params: { fid: string } }
) {
    const fid = params.fid;
    const data = await getData(+fid);
    if (!data)
        return new Response("taste data not found for fid: " + fid, {
            status: 500,
        });
    const { ensNames, hasOpepen, pfpUrls } = data;
    const imageParams = new URLSearchParams();

    imageParams.set("pfp", pfpUrls.at(0) ?? "");
    imageParams.set("ensNames", ensNames.join(","));
    imageParams.set("hasOpepen", hasOpepen ? "true" : "");

    const image = appConfig.host + "/" + fid + "/vanity/image?" + imageParams;
    const frame: Frame = {
        image,
        postUrl: appConfig.host + "/" + fid + "/vanity",
        version: "vNext",
        // accepts: [],
        buttons: [
            { action: "post", label: "<" },
            { action: "post", label: ">" },
        ],
        imageAspectRatio: "1.91:1",
        // inputText,
        ogImage: image,
        // state,
    };
    const html = getFrameHtml(frame);
    return new Response(html, { headers: { "content-type": "text/html" } });
}

export async function POST(
    req: NextRequest,
    { params }: { params: { fid: string } }
) {
    const { fid } = params;
    const data: FrameActionPayload = await req.json();
    // route request
    if (data.untrustedData.buttonIndex == 1) {
        const res = await fetch(appConfig.host + "/" + fid + "/identity");
        return new Response(res.body, {
            headers: { "content-type": "text/html" },
        });
    } else if (data.untrustedData.buttonIndex == 2) {
        const res = await fetch(appConfig.host + "/" + fid + "/status");
        return new Response(res.body, {
            headers: { "content-type": "text/html" },
        });
    }
}
