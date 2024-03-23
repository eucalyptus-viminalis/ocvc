import { Frame, FrameActionPayload, getFrameHtml } from "frames.js";
import { NextRequest } from "next/server";
import { getData } from "./data";
import { appConfig } from "../../appConfig";

export async function GET(
    req: NextRequest,
    { params }: { params: { fname: string } }
) {
    const fnameSlug = params.fname;
    const data = await getData(fnameSlug)
    const {supporters,} = data
    const imageParams = new URLSearchParams()
    supporters.forEach((supporter, i) => {
        imageParams.set(`supporter${i}Pfp`, supporter.pfp)
        imageParams.set(`supporter${i}Fname`, supporter.fname)
    })

    const image = appConfig.host + '/' + fnameSlug + '/supporters/image?' + imageParams
    const frame: Frame = {
        image,
        postUrl: appConfig.host + '/' + fnameSlug + '/supporters',
        version: 'vNext',
        // accepts: [],
        buttons: [
            {action: 'post', label: '<'},
        ],
        imageAspectRatio: '1.91:1',
        // inputText,
        ogImage: image,
        // state,
    }
    const html = getFrameHtml(frame)
    return new Response(html, {headers:{'content-type':'text/html'}})
}

export async function POST(
    req:NextRequest,
    {params}: {params: {fname: string}}
) {
    const {fname} = params
    const data: FrameActionPayload = await req.json()
    // route request
    if (data.untrustedData.buttonIndex == 1) {
        const res = await fetch(appConfig.host + '/' + fname + '/taste')
        return new Response(res.body, {headers:{'content-type':'text/html'}})
    }
}
