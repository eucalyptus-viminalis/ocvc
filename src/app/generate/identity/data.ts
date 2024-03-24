"use server";
import { NeynarAPIClient } from "@neynar/nodejs-sdk"
import { appConfig } from "../../appConfig"

export type IdentityData = {
    fid?: number,
    eth_addresses?: string[]
}

export async function getIdentityData(fid: number) {
    const neynar = new NeynarAPIClient(appConfig.neynarApiKey, {
        // axiosInstance,
        // basePath,
        // logger,
    })
    const eth_addresses = await neynar.fetchBulkUsers([fid]).then(v => {
        return v.users.at(0)?.verified_addresses.eth_addresses
    })
    const data: IdentityData = {
        eth_addresses,
        fid,
    }
    console.log(data)
    return data
}

// await getData(13642)