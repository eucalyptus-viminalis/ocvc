type VanityData = {
    pfp: string
    hasOpepen: boolean
}

export async function getData(fname: string) {
    const dummyData:VanityData = {
        pfp: "https://i.imgur.com/D16J8Zv.gif",
        hasOpepen: true
    }
    return dummyData
}