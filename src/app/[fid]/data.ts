"use server"
import { prisma } from "@/prisma/client"

export async function getVibeCheckData(fid: number) {
    const data = await prisma.identityModel.findFirst({
        where: {
            fid: {
                equals: fid
            }
        },
    })
    return data
}