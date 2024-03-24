import { prisma } from "@/prisma/client"

type VanityData = {
    pfp: string
    hasOpepen: boolean
}

export async function getData(fid: number) {
    const data = await prisma.vanityModel.findFirst({
        where: {
            fid: {
                equals: fid
            }
        },
    })
    return data
    // const dummyData:VanityData = {
    //     pfp: "https://i.imgur.com/D16J8Zv.gif",
    //     hasOpepen: true
    // }
    // return dummyData
}