import { Frame, FrameActionPayload, getFrameHtml } from "frames.js";
import { NextRequest } from "next/server";
import { getData } from "./data";
import { appConfig } from "../../appConfig";

export async function GET(
    req: NextRequest,
    { params }: { params: { fid: string } }
) {
    const fidSlug = params.fid;
    const data = await getData(+fidSlug);
    if (!data)
        return new Response("no status data found for fid: " + fidSlug, {
            status: 500,
        });
    const {
        fcEngagementScore_percentile,
        fcEngagementScore_rank,
        fcEngagementScore_score,
        fcFollowerCount,
        fcFollowingScore_percentile,
        fcFollowingScore_rank,
        fcFollowingScore_score,
        fid,
        firstTxOnBase_timestamp,
        firstTxOnBase_txHash,
        firstTxOnEth_timestamp,
        firstTxOnEth_txHash,
        totalSuperchainBalance,
    } = data;
    const imageParams = new URLSearchParams();
    imageParams.set('fid', fid.toString())
    if (firstTxOnBase_txHash) {
        imageParams.set('firstTxOnBase', [
            firstTxOnBase_timestamp,
            firstTxOnBase_txHash
        ].join(','))
    }
    if (firstTxOnEth_txHash) {
        imageParams.set('firstTxOnEth', [
            firstTxOnEth_timestamp,
            firstTxOnEth_txHash
        ].join(','))
    }
    if (fcEngagementScore_rank) {
        imageParams.set('fcEngagementScore', [
            fcEngagementScore_percentile!.toString(),
            fcEngagementScore_rank.toString(),
            fcEngagementScore_score!.toString()
        ].join(','))
    }
    if (fcFollowingScore_rank) {
        imageParams.set('fcFollowingScore', [
            fcFollowingScore_percentile!.toString(),
            fcFollowingScore_rank.toString(),
            fcFollowingScore_score!.toString()
        ].join(','))
    }
    imageParams.set("fcFollowerCount", fcFollowerCount?.toString() ?? "");
    imageParams.set("totalSuperchainBalance", totalSuperchainBalance ?? "");

    const image =
        appConfig.host + "/" + fidSlug + "/status/image?" + imageParams;
    const frame: Frame = {
        image,
        postUrl: appConfig.host + "/" + fidSlug + "/status",
        version: "vNext",
        // accepts: [],
        buttons: [
            { action: "post", label: "<" },
            { action: "post", label: ">" },
        ],
        imageAspectRatio: "1.91:1",
        // inputText,
        ogImage: image,
        // state,
    };
    const html = getFrameHtml(frame);
    return new Response(html, { headers: { "content-type": "text/html" } });
}

export async function POST(
    req: NextRequest,
    { params }: { params: { fid: string } }
) {
    const { fid } = params;
    const data: FrameActionPayload = await req.json();
    // route request
    if (data.untrustedData.buttonIndex == 1) {
        const res = await fetch(appConfig.host + "/" + fid + "/vanity");
        return new Response(res.body, {
            headers: { "content-type": "text/html" },
        });
    } else if (data.untrustedData.buttonIndex == 2) {
        const res = await fetch(appConfig.host + "/" + fid + "/taste");
        return new Response(res.body, {
            headers: { "content-type": "text/html" },
        });
    }
}
