"use server"
import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { appConfig } from "../../appConfig";
import { Variables } from "@airstack/node/dist/types/types";
import { fetchQuery, init } from "@airstack/node";

export type TasteData = {
    latestTokenTransfers?: TokenTransfer[];
};

type TokenTransfer = {
    tokenAddress: string
    tokenNft: {
        contentValue: {
            image: {
                medium: string
            }
        }
        tokenId: string
    }
    tokenType: string   // e.g. "ERC721"
    blockchain: string  // e.g. "base"
    token: {
        name: string
    }
}

export async function getTasteData(fid: number) {
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
    const eth_addresses = user.verified_addresses.eth_addresses;
    if (!eth_addresses || eth_addresses.length == 0) {
        throw new Error("");
    }
    const ethAddy = eth_addresses.at(0);
    if (!ethAddy) return null;
    const latestTransfersRes = await getRecentTokenTransfersOnBase(
        eth_addresses,
        "base"
    );
    const latestTransfers = latestTransfersRes.TokenTransfers.TokenTransfer.filter(token => {
        return token.tokenNft.contentValue.image
    })
    const data: TasteData = {
        latestTokenTransfers: latestTransfers
    }
    console.log(JSON.stringify(latestTransfers, null,2));
    return data
}

init(appConfig.airstackApiKey, "dev");
export async function getRecentTokenTransfersOnBase(
    eoas: string[],
    blockchain: string
) {
    const vars: Variables = {
        eoas: eoas,
        blockchain: blockchain,
    };
    const { data, error }: {error: any, data: TokenTransfersData} = await fetchQuery(gql, vars);
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

type TokenTransfersData = {
    TokenTransfers: {
        TokenTransfer: [TokenTransfer]
    }
}

const gql = `
  query MyQuery($eoas: [Identity!], $blockchain: TokenBlockchain!) {
    TokenTransfers(
      input: {filter: {tokenType: {_in: [ERC1155, ERC721]}, to: {_in: $eoas}}, blockchain: $blockchain, order: {blockTimestamp: DESC}, limit: 20}
    ) {
      TokenTransfer {
        tokenAddress
        tokenNft {
          contentValue {
            image {
              medium
            }
          }
          tokenId
        }
        tokenType
        type
        blockchain
        token {
          name
        }
      }
    }
  }  
  `;
