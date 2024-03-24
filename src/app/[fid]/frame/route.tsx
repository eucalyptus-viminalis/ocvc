/* eslint-disable react/jsx-key */
import { Frame, FrameActionPayload, getFrameHtml } from 'frames.js';
import { NextRequest } from 'next/server';
import { appConfig } from '../../appConfig';

export async function GET(
    req: NextRequest,
    { params }: { params: { fid: string } }
) {
    const {fid} = params
    const imageParams = new URLSearchParams()
    // TODO: cache bust remove later
    imageParams.set('date', Date.now().toString())
    const image = appConfig.host + '/' + fid + '/frame/image?' + imageParams
    const frame: Frame = {
        image,
        postUrl: appConfig.host + '/' + fid + '/frame',
        version: 'vNext',
        accepts: [{
            id: 'xmtp',
            version: 'vNext'
        }],
        buttons: [
            {action:'post',label:'refresh'},
            {action: 'post', label: 'check vibe>'}
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
        title: fid + ' | ocvc*',
    })
    return new Response(html, {headers:{'content-type':'text/html'}});
}

export async function POST(
    req:NextRequest,
    {params}: {params: {fid: string}}
) {
    const {fid} = params

    const data: FrameActionPayload = await req.json()

    // route request
    if (data.untrustedData.buttonIndex == 1) {
        const res = await fetch(req.nextUrl)
        return new Response(res.body, {headers:{'content-type':'text/html'}})
    } else if (data.untrustedData.buttonIndex == 2) {
        const res = await fetch(appConfig.host + '/' + fid + '/identity')
        return new Response(res.body, {headers:{'content-type':'text/html'}})
    }
}
