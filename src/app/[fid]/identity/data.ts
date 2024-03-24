"use server"

import { prisma } from "@/prisma/client"

export async function getData(fname: string) {
    const data = prisma.identityModel.findFirst({
        where: {

        }
    })
    // const data: IdentityData = {
    //     fname,
    //     ens,
    // }
    return data
}