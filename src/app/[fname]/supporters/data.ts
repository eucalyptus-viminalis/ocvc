type Supporter = {
    fname: string,
    pfp: string
}
type SupportersData = {
    supporters: Supporter[]
}

export async function getData(fname: string) {
    const dummyData: SupportersData = {
        supporters: [
            {
                fname: 'snail',
                pfp: 'https://i.imgur.com/13Wmfao.jpg',
            },
            {
                fname: 'oladipoyuusuf',
                pfp: 'https://i.imgur.com/FnwfV0u.jpg'
            }
        ],
    }
    return dummyData
}