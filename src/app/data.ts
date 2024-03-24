"use server"
import { prisma } from "@/prisma/client"

export async function getLatestChecksData() {
    const data = await prisma.identityModel.findMany({
        take: 10
    })
    return data
}