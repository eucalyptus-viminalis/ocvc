import { getData } from "./data";

type IdentityProps = {
    fid: number;
};

export async function Identity(props: IdentityProps) {
    const { fid } = props;
    const data = await getData(fid);

    return (
        <>
            <span>{data.fid}</span>
            {data.eth_addresses?.map((ethAddy, i) => {
                const key = `ethAddy${i}`
                return (
                    <span key={key}>{ethAddy}</span>
                )
            })}
        </>
    );
}
