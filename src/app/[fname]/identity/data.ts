type IdentityData = {
    fname: string
    ens?: string
}
export async function getData(fname: string) {
    // const data: IdentityData = {
    //     fname,
    //     ens,
    // }
    // return data
    const dummyData: IdentityData = {
        fname: '3070',
        ens: '3070.eth',
    }
    return dummyData
}