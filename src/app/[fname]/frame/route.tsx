import { Frame, getFrameHtml } from "frames.js";
import {Button} from 'frames.js/core'
import { createFrames } from "frames.js/next";
import { NextRequest } from "next/server";

// export async function GET(
//     req: NextRequest,
//     { params }: { params: { fname: string } }
// ) {
//     const fname = params.fname;
//     const image = req.nextUrl.toString() + '/image'
//     const frame: Frame = {
//         image,
//         postUrl: req.nextUrl.toString(),
//         version: 'vNext',
//         // accepts,
//         buttons: [
//             {action:'post',label:'refresh'}
//         ],
//         imageAspectRatio: '1.91:1',
//         // inputText,
//         ogImage: image,
//         // state,
//     }
//     const html = getFrameHtml(frame, {
//         // htmlBody: ,
//         // htmlHead,
//         // og,
//         title: fname + ' | ocvc*',
//     })
//     return new Response(html, {headers:{'content-type':'text/html'}});
// }

const frames = createFrames()
const handleRequest = frames(async (ctx) => {

    return {
        image: ctx.url + '/image',
        // kind: ,
        // location,
        accepts: [{
            id: 'xmtp',
            version: 'vNext'
        }],
        // then,
        buttons: [
            <Button action="post">refresh</Button>
        ],
        // headers: '',
        // imageOptions: {

        // },
        // state,
        // status,
        // statusText,
        // textInput,
    }
})

export const GET = handleRequest
export const POST = handleRequest