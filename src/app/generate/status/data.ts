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
    totalSuperchainBalance?: string; // in ETH
};

export async function getData(fid: number) {
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
    if (eth_addresses.at(0)) {
        const [res1, res2] = await Promise.all([
            getFirstTokenTransferFrom(eth_addresses.at(0)!, "base"),
            getFirstTokenTransferFrom(eth_addresses.at(0)!, "ethereum"),
        ])
        firstTxOnBase = res1
        firstTxOnEth = res2
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
        // totalSuperchainBalance,
    };
    console.log(data);
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