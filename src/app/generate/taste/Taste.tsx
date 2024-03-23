import { getData } from "./data";

type TasteProps = {
    fid: number;
};

export async function Taste(props: TasteProps) {
    const { fid } = props;
    const data = await getData(fid);

    return (
        <>
            {data?.latestTokenTransfers.map((tokenTransfer, i) => {
                const key = `tokenTransfer${i}`
                return (
                    <img 
                        src={tokenTransfer.tokenNft.contentValue.image.medium} 
                        key={key}
                        width={300}
                        height={300}
                        style={{
                            objectFit: 'scale-down',
                            borderRadius: 16
                        }}
                    />
                )
            })}
        </>
    );
}
