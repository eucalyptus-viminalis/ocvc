/* eslint-disable react/jsx-key */
import { Frame, FrameActionPayload, getFrameHtml } from 'frames.js';
import {Button} from 'frames.js/core'
import { createFrames } from "frames.js/next";
import { NextRequest } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { fname: string } }
) {
    const fname = params.fname;
    const image = req.nextUrl.toString() + '/image'
    const frame: Frame = {
        image,
        postUrl: req.nextUrl.toString(),
        version: 'vNext',
        accepts: [{
            id: 'xmtp',
            version: 'vNext'
        }],
        buttons: [
            {action:'post',label:'refresh'}
        ],
        imageAspectRatio: '1.91:1',
        // inputText,
        ogImage: image,
        // state,
    }
    const html = getFrameHtml(frame, {
        // htmlBody: ,
        // htmlHead,
        // og,
        title: fname + ' | ocvc*',
    })
    return new Response(html, {headers:{'content-type':'text/html'}});
}

export async function POST(req:NextRequest) {
    const data: FrameActionPayload = await req.json()
    // route request
    if (data.untrustedData.buttonIndex == 1) {
        const res = await fetch(req.nextUrl)
        return new Response(res.body, {headers:{'content-type':'text/html'}})
    }
}

// const frames = createFrames()
// const handleRequest = frames(async (ctx) => {

//     return {
//         image: ctx.url + '/image',
//         // kind: ,
//         // location,
//         accepts: [{
//             id: 'xmtp',
//             version: 'vNext'
//         }],
//         // then,
//         buttons: [
//             <Button action="post">refresh</Button>
//         ],
//         // headers: ,
//         // imageOptions: {

//         // },
//         // state,
//         // status,
//         // statusText,
//         // textInput,
//     }
// })

// export const GET = handleRequest
// export const POST = handleRequest