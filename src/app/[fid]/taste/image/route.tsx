import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import FrameDiv from "../../../FrameDiv";
import TopBar from "../../../TopBar";

export const runtime = "edge";

export async function GET(req: NextRequest) {
    const MAX_IMAGES = 3;

    const imageUrls = [];
    for (let i = 0; i < MAX_IMAGES; i++) {
        const imageUrl = req.nextUrl.searchParams.get(`imageUrl${i}`);
        if (imageUrl) imageUrls.push(imageUrl);
    }

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
                <TopBar
                    opacity={0.5}
                    route={req.nextUrl.pathname.split("/").at(-2)}
                ></TopBar>
                <div
                    id="mid-section"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: 20,
                        gap: 32,
                        height: "70%",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        fontFamily: "mono",
                    }}
                >
                    {imageUrls.map((imageUrl, i) => {
                        const key = 'image' + i
                        return (
                    <img
                        src={imageUrl}
                        key={key}
                        alt={key}
                        width={360}
                        height={420}
                        style={{
                            objectFit: "cover",
                            borderRadius: 16
                        }}
                    />
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
                        fontSize: 46,
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
            headers: { "cache-control": "max-age=0" },
            height: 630,
            // status,
            // statusText,
            width: 1200,
        }
    );
}
