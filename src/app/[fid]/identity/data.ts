"use server"

import { prisma } from "@/prisma/client"

export async function getData(fid: number) {
    const data = await prisma.identityModel.findFirst({
        where: {
            fid: {
                equals: fid
            }
        }
    })
    console.log(data)
    // const data: IdentityData = {
    //     fname,
    //     ens,
    // }
    return data
}