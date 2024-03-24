// type StatusData = {
//     firstTxOnBase?: {
//         timestamp: number
//         txHash: string
//     },
//     firstTxOnEth?: {
//         timestamp: number
//         txHash: string
//     },
//     fcFollowerCount?: number,
//     totalSuperchainBalance?: string,    // in ETH
// }

import { prisma } from "@/prisma/client";

export async function getData(fid: number) {
    const data = await prisma.statusModel.findFirst({
        where: {
            fid: {
                equals: fid
            }
        }
    })
    return data
    // const dummyData: StatusData = {
    //     fcFollowerCount: 6969420,
    //     firstTxOnEth: {
    //         timestamp: 1513082783,
    //         txHash: '0x1',
    //     },
    //     firstTxOnBase: {
    //         timestamp: 1702385183,
    //         txHash: '0x8453',
    //     },
    //     totalSuperchainBalance: '69.4206942012469',
    // }
    // return dummyData
}