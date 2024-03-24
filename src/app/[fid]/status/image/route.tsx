import { ImageResponse } from '@vercel/og'
import { NextRequest } from "next/server";
import FrameDiv from "../../../FrameDiv";
import TopBar from "../../../TopBar";

export const runtime = "edge";

export async function GET(req: NextRequest) {
    // imageParams.set('fcFollowerCount', fcFollowerCount?.toString() ?? '')
    // imageParams.set('firstTxOnBaseTimestamp', firstTxOnBase?.timestamp.toString() ?? '')
    // imageParams.set('firstTxOnEthTimestamp', firstTxOnEth?.timestamp.toString() ?? '')
    // imageParams.set('totalSuperchainBalance', totalSuperchainBalance ?? '')

    const fid = req.nextUrl.searchParams.get('fid')
    const fcFollowerCount = req.nextUrl.searchParams.get('fcFollowerCount')
    const totalSuperchainBalance = req.nextUrl.searchParams.get('totalSuperchainBalance')

    const firstTxOnBaseEncoded = req.nextUrl.searchParams.get('firstTxOnBase')
    const firstTxOnEthEncoded = req.nextUrl.searchParams.get('firstTxOnEth')
    const fcEngagementScoreEncoded = req.nextUrl.searchParams.get('fcEngagementScore')
    const fcFollowingScoreEncoded = req.nextUrl.searchParams.get('fcFollowingScore')
    const firstTxOnBase = firstTxOnBaseEncoded ? decodeURIComponent(firstTxOnBaseEncoded).split(',') : []
    const fcEngagementScore = fcEngagementScoreEncoded ? decodeURIComponent(fcEngagementScoreEncoded).split(',') : []
    const fcFollowingScore = fcFollowingScoreEncoded ? decodeURIComponent(fcFollowingScoreEncoded).split(',') : []
    const firstTxOnEth = firstTxOnEthEncoded ? decodeURIComponent(firstTxOnEthEncoded).split(',') : []

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
                    <span>{fid}</span>
                </TopBar>
                <div
                    id="mid-section"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: 20,
                        gap: 10,
                        height: "70%",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        fontFamily: "mono",
                        fontSize: 32
                    }}
                >
                    {fcFollowerCount ? (
                        <div style={{display:'flex', flexDirection:'column', width: '19%'}}>
                            <span>fc follower count</span>
                            <span>{fcFollowerCount}</span>
                            </div>
                    ) : null}
                    {firstTxOnBase ? (
                        <div style={{display:'flex', flexDirection:'column', width: '19%'}}>
                            <span>1st tx on base</span>
                            <span style={{wordBreak: 'break-all'}}>on {firstTxOnBase.at(0)}</span>
                            <span style={{wordBreak: 'break-all'}}>{firstTxOnBase.at(1)}</span>
                            </div>
                    ) : null}
                    {firstTxOnBase ? (
                        <div style={{display:'flex', flexDirection:'column', width: '19%'}}>
                            <span>1st tx on eth</span>
                            <span style={{wordBreak: 'break-all'}}>on {firstTxOnEth.at(0)}</span>
                            <span style={{wordBreak: 'break-all'}}>{firstTxOnEth.at(1)}</span>
                            </div>
                    ) : null}
                    {fcFollowingScore?(
                        <div style={{display:'flex', flexDirection:'column', width: '19%'}}>
                            <span>fc following scores</span>
                            {/* percentile, rank, score */}
                            <span>rank: {fcFollowingScore[1]}</span>
                            <span>percentile: {fcFollowingScore[0]}</span>
                        </div>
                    ):null}
                    {fcEngagementScore?(
                        <div style={{display:'flex', flexDirection:'column', width: '19%'}}>
                            <span>fc engagement scores</span>
                            {/* percentile, rank, score */}
                            <span>rank: {fcEngagementScore[1]}</span>
                            <span>percentile: {fcEngagementScore[0]}</span>
                        </div>
                    ):null}
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
                    {totalSuperchainBalance?(
                        <div style={{display:'flex', flexDirection:'column', width: '19%'}}>
                            <span>total superchain balance</span>
                            <span>{totalSuperchainBalance}</span>
                        </div>
                    ) : null}
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