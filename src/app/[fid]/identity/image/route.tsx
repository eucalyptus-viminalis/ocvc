import { ImageResponse } from '@vercel/og'
import { NextRequest } from "next/server";
import FrameDiv from "../../../FrameDiv";
import TopBar from "../../../TopBar";

export const runtime = "edge";

export async function GET(req: NextRequest) {

    // imageParams.set('fname', fname)
    // imageParams.set('fid', fid.toString())
    // imageParams.set('eth_addresses', eth_addresses.join(','))
    const fname = req.nextUrl.searchParams.get('fname')
    const fid = req.nextUrl.searchParams.get('fid')
    const eth_addressesEncoded = req.nextUrl.searchParams.get('eth_addresses')
    const eth_addresses = eth_addressesEncoded ? decodeURIComponent(eth_addressesEncoded).split(',') : []

    // Fonts
    const regular = await fetch(
        new URL("@/assets/Lumanosimo-Regular.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());
    // const bold = await fetch(
    //     new URL("@/assets/CourierPrime-Bold.ttf", import.meta.url)
    // ).then((res) => res.arrayBuffer());
    const mono = await fetch(
        new URL("@/assets/CourierPrime-Regular.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            <FrameDiv>
                <TopBar opacity={0.5} route={req.nextUrl.pathname.split("/").at(-2)}>
                </TopBar>
                <div
                    id="mid-section"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: 20,
                        gap: 50,
                        height: "70%",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        fontFamily: "mono",
                    }}
                >
                    <h1 style={{width: '30%', wordBreak: 'break-all'}}>{fname}</h1>
                    <h1 style={{width: '30%', wordBreak: 'break-all'}}>{fid}</h1>
                    {eth_addresses?.map((ethAddy, i) => {
                        const key = `ethAddy{i}`
                        return (
                            <span style={{
                                wordBreak: 'break-all',
                                width: '30%'
                            }} key={key}>{ethAddy}</span>
                        )
                    })}
                </div>
                <div
                    id="bottom-bar"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        width: "100%",
                        fontFamily: "mono",
                        fontSize: 46
                    }}
                >
                    <span>{}</span>
                </div>
            </FrameDiv>
        ),
        {
            // debug: true,
            // emoji,
            fonts: [
                {
                    data: regular,
                    name: "regular",
                    // lang,
                    style: "normal",
                    // weight,
                },
                {
                    data: mono,
                    name: "mono",
                    style: "normal",
                },
            ],
            headers: {'cache-control':'max-age=0'},
            height: 630,
            // status,
            // statusText,
            width: 1200,
        }
    );
}