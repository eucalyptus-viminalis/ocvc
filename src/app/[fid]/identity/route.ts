import { Frame, FrameActionPayload, getFrameHtml } from "frames.js";
import { NextRequest } from "next/server";
import { getData } from "./data";
import { appConfig } from "../../appConfig";

export async function GET(
    req: NextRequest,
    { params }: { params: { fid: string } }
) {

    const fidSlug = params.fid;
    const data = await getData(+fidSlug)
    if (!data) {
        return new Response('failed fetching data', {status:500})
    }
    const {fid, eth_addresses,fname,} = data
    const imageParams = new URLSearchParams()

    imageParams.set('fname', fname)
    imageParams.set('fid', fid.toString())
    imageParams.set('eth_addresses', eth_addresses.join(','))
    const image = appConfig.host + '/' + fidSlug + '/identity/image?' + imageParams
    const frame: Frame = {
        image,
        postUrl: appConfig.host + '/' + fidSlug + '/identity',
        version: 'vNext',
        // accepts: [],
        buttons: [
            {action: 'post', label: '<'},
            {action: 'post', label: '>'},
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
    {params}: {params: {fid: string}}
) {
    const {fid} = params
    const data: FrameActionPayload = await req.json()
    // route request
    if (data.untrustedData.buttonIndex == 1) {
        const res = await fetch(appConfig.host + '/' + fid + '/frame')
        return new Response(res.body, {headers:{'content-type':'text/html'}})
    } else if (data.untrustedData.buttonIndex == 2) {
        const res = await fetch(appConfig.host + '/' + fid + '/vanity')
        return new Response(res.body, {headers:{'content-type':'text/html'}})
    }
}
