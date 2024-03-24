"use server";
import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { appConfig } from "../../appConfig";
import { init, fetchQuery } from "@airstack/node";
import { Variables } from "@airstack/node/dist/types/types";

export type StatusData = {
    firstTxOnBase?: {
        timestamp: string;
        txHash: string;
    };
    firstTxOnEth?: {
        timestamp: string;
        txHash: string;
    };
    fcFollowerCount?: number;
    fcEngagementScore?: {
        rank: number
        score: number
        percentile: number
    }
    fcFollowingScore?: {
        rank: number
        score: number
        percentile: number
    }
    totalSuperchainBalance?: string; // in ETH
};

export async function getStatusData(fid: number) {
    const neynar = new NeynarAPIClient(appConfig.neynarApiKey, {
        // axiosInstance,
        // basePath,
        // logger,
    });
    const res = await neynar.fetchBulkUsers([fid]);
    const user = res.users.at(0);
    if (!user) {
        throw new Error("");
    }
    const fcFollowerCount = user.follower_count;
    const eth_addresses = user.verified_addresses.eth_addresses;
    let firstTxOnBase;
    let firstTxOnEth;
    let followingScore;
    let engagementScore;
    if (eth_addresses.at(0)) {
        const [res1, res2, res3, res4] = await Promise.all([
            getFirstTokenTransferFrom(eth_addresses.at(0)!, "base"),
            getFirstTokenTransferFrom(eth_addresses.at(0)!, "ethereum"),
            getFCEngagementScoreByFID(fid),
            getFCFollowingScoreByFID(fid),
        ])
        firstTxOnBase = res1
        firstTxOnEth = res2
        followingScore = res3
        console.log('res3',res3)
        engagementScore = res4
    }

    const data: StatusData = {
        fcFollowerCount,
        firstTxOnBase: firstTxOnBase ? {
            timestamp: firstTxOnBase.blockTimestamp,
            txHash: firstTxOnBase.transactionHash,
        }: undefined,
        firstTxOnEth: firstTxOnEth ? {
            timestamp: firstTxOnEth.blockTimestamp,
            txHash: firstTxOnEth.transactionHash,
        }: undefined,
        fcEngagementScore: engagementScore ? {
            percentile: engagementScore.percentile,
            rank: engagementScore.rank,
            score: engagementScore.score,
        }: undefined,
        fcFollowingScore: followingScore ? {
            percentile: followingScore.percentile,
            rank: followingScore.rank,
            score: followingScore.score,
        }: undefined,
        // totalSuperchainBalance, //
    };
    return data;
}

// await getData(13642)
init(appConfig.airstackApiKey, "dev");
export async function getFirstTokenTransferFrom(
    eoa: string,
    blockchain: string
) {
    const gql = `
    query MyQuery($identity:Identity!, $blockchain:TokenBlockchain!) {
        Wallet(
          input: {identity: $identity, blockchain: $blockchain}
        ) {
          tokenTransfers(
            input: {order: {blockTimestamp: ASC}, limit: 1, filter: {from: {_eq: $identity}}}
          ) {
            blockTimestamp
            transactionHash
            blockchain
            chainId
          }
        }
      }
    `;

    type WalletData = {
        Wallet: {
            tokenTransfers: [TokenTransfer];
        };
    };
    const vars: Variables = {
        identity: eoa,
        blockchain: blockchain,
    };
    const { data, error }: { error: any; data: WalletData } = await fetchQuery(
        gql,
        vars
    );
    if (error) {
        throw new Error(error.message);
    }
    const firstTokenTransfer = data.Wallet.tokenTransfers.at(0);
    return firstTokenTransfer;
}

type TokenTransfer = {
    blockTimestamp: string;
    transactionHash: string;
    blockchain: string; // e.g. "base"
    chainId: string; // e.g. "8453"
};

// {
//     "result": [
//         {
//             "fid": 13642,
//             "fname": "3070",
//             "username": "3070",
//             "rank": 628,
//             "score": 0.00012561345647554845,
//             "percentile": 99
//         }
//     ]
// }

type KarmaScoreResult = {
    fid: number,
    fname: string,
    username: string,
    rank: number,
    score: number,
    percentile: number
}
type KarmaScoreData = {
    result: [KarmaScoreResult]
}
export async function getFCFollowingScoreByFID(fid: number) {
    "use server"
    const res = await fetch("https://graph.cast.k3l.io/scores/global/following/fids", {
        body: JSON.stringify([fid]),
        method: 'POST',
        headers: {'Content-Type':'application/json'}
    })
    const data: KarmaScoreData = await res.json()
    const score: KarmaScoreResult | undefined = data.result.at(0)
    return score
}


export async function getFCFollowingScoreByFname(fname: string) {
    const res = await fetch("https://graph.cast.k3l.io/scores/global/following/handles", {
        body: JSON.stringify([fname]),
        method: 'POST',
        headers: {'Content-Type':'application/json'}
    })
    const data: KarmaScoreData = await res.json()
    const score: KarmaScoreResult | undefined = data.result.at(0)
    return score
}


export async function getFCEngagementScoreByFID(fid: number) {
    "use server"
    console.log('fid', fid)
    const res = await fetch("https://graph.cast.k3l.io/scores/global/engagement/fids", {
        body: JSON.stringify([fid]),
        method: 'POST',
        headers: {'Content-Type':'application/json'}
    })
    const data: KarmaScoreData = await res.json()
    console.log('fcEngagementScoreData', JSON.stringify(data))
    const score: KarmaScoreResult | undefined = data.result.at(0)
    return score
}


export async function getFCEngagementScoreByFname(fname: string) {
    const res = await fetch("https://graph.cast.k3l.io/scores/global/engagement/handles", {
        body: JSON.stringify([fname]),
        method: 'POST',
        headers: {'Content-Type':'application/json'}
    })
    const data: KarmaScoreData = await res.json()
    const score: KarmaScoreResult | undefined = data.result.at(0)
    return score
}

