import { ImageResponse } from '@vercel/og'
import { NextRequest } from "next/server";
import FrameDiv from "../../../FrameDiv";
import TopBar from "../../../TopBar";

export const runtime = "edge";

export async function GET(req: NextRequest) {

    const pfp = decodeURIComponent(req.nextUrl.searchParams.get('pfp')!)
    const hasOpepen = req.nextUrl.searchParams.get('hasOpepen')

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
                        flexDirection: "column",
                        padding: 20,
                        gap: 16,
                        height: "70%",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        fontFamily: "mono",
                    }}
                >
                    <img
                    src={pfp}
                        alt='pfp' 
                        width={400}
                        height={400}
                        style={{
                            objectFit: 'fill',
                            borderRadius: hasOpepen ? '0 200px 200px 200px' : 200
                        }}
                    />
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