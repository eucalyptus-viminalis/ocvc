
type VibeCheck = {
    fname: string
    pfp: string
    lastUpdatedTimestamp: number
}
type RootData = {
    checks: VibeCheck[]
}
async function getData() {
    const dummyData: RootData = {
        checks: [
            {
               fname: '3070',
               lastUpdatedTimestamp: 123,
               pfp: 'https://i.imgur.com/D16J8Zv.gif', 
            }
        ],
    }
    return dummyData
}