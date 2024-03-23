import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import FrameDiv from "../../../FrameDiv";
import TopBar from "../../../TopBar";

export const runtime = "edge";

type Supporter = {
    fname: string;
    pfp: string;
};

export async function GET(req: NextRequest) {
    const MAX_SUPPORTERS = 3;

    const supporters: Supporter[] = [];
    for (let i = 0; i < MAX_SUPPORTERS; i++) {
        const fname = req.nextUrl.searchParams.get(`supporter${i}Fname`);
        const pfp = req.nextUrl.searchParams.get(`supporter${i}Pfp`);
        if (fname && pfp)
            supporters.push({
                fname,
                pfp,
            });
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
                    {supporters.map((supporter, i) => {
                        const key = "supporter" + i;
                        return (
                            <div
                                key={key}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <img
                                    src={supporter.pfp}
                                    alt={key}
                                    width={400}
                                    height={400}
                                    style={{
                                        objectFit: "cover",
                                        borderRadius: 200
                                    }}
                                />
                                <span>{supporter.fname}</span>
                            </div>
                        );
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
