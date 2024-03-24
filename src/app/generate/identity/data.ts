"use server";
import { NeynarAPIClient } from "@neynar/nodejs-sdk"
import { appConfig } from "../../appConfig"

export type IdentityData = {
    fid?: number,
    fname?: string
    eth_addresses?: string[]
}

export async function getIdentityData(fid: number) {
    const neynar = new NeynarAPIClient(appConfig.neynarApiKey, {
        // axiosInstance,
        // basePath,
        // logger,
    })
    const res = await neynar.fetchBulkUsers([fid])
    const user = res.users.at(0)
    if (!user) throw new Error('no user found')
    const eth_addresses = user.verified_addresses.eth_addresses
    const fname = user.username
    const data: IdentityData = {
        eth_addresses,
        fid,
        fname
    }
    console.log(data)
    return data
}

// await getData(13642)