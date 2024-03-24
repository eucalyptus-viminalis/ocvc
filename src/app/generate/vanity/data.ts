"use server";
import {createPublicClient, http} from 'viem'
import {mainnet} from 'viem/chains'
import { NeynarAPIClient } from "@neynar/nodejs-sdk"
import { appConfig } from "../../appConfig"
import { OPEPEN_ABI } from '@/src/abi/OpepenABI';

export type VanityData = {
    pfpUrls?: string[],
    hasOpepen?: boolean,
    ensNames?: string[]
}

const viem = createPublicClient({
    transport: http(),
    chain: mainnet
})
const opepenCA = '0x6339e5E072086621540D0362C4e3Cea0d643E114'

export async function getVanityData(fid: number) {
    const neynar = new NeynarAPIClient(appConfig.neynarApiKey, {
        // axiosInstance,
        // basePath,
        // logger,
    })
    const res = await neynar.fetchBulkUsers([fid])
    const user = res.users.at(0)
    if (!user) throw new Error('user not found')
    const fcPfp = user.pfp_url
    const eth_addresses = user.verified_addresses.eth_addresses
    // ENS Vanity...
    const ensNames = await Promise.all(
        eth_addresses.map(addy => {
            return viem.getEnsName({address: addy as `0x${string}`})
        })
    )
    const ensAvatars = await Promise.all(
        ensNames.map(name => {
            return viem.getEnsAvatar({name: name as string})
        })
    )
    const opepenCounts = await Promise.all(
        eth_addresses.map(ethAddy => {
            return viem.readContract({
        abi: OPEPEN_ABI,
        address: opepenCA as `0x${string}`,
        functionName:'balanceOf',
        args: [ethAddy as `0x${string}`]
            })
        })
    )
    const opepenCountTotal = opepenCounts.reduce((acc, v) => {
        return Number(v) + acc
    }, 0)
    const data: VanityData = {
        hasOpepen: opepenCountTotal != 0,
        pfpUrls: [fcPfp, ...ensAvatars as string[]],
        ensNames: ensNames as string[]
    }
    return data
}
