export default function UserRootPage({ params }: { params: { fname: string } }) {
    const {fname} = params
    return (
        <>
            <h1>{fname}</h1>
        </>
    )
}