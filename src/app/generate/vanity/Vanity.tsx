"use server"
import { getData } from "./data";

type TasteProps = {
    fid: number;
};

export async function Vanity(props: TasteProps) {
    const { fid } = props;
    const data = await getData(fid);

    return (
        <div style={{backgroundColor: 'white'}}>
            {data.ensNames.map((ensName, i) => {
                const key = `ensName${i}`
                return (
                    <span className="text-green-600" key={key}>{ensName}</span>
                )
            })}
            {data.pfpUrls.map((pfpUrl, i) => {
                const key = `pfp${i}`
                return (
                    <img 
                        src={pfpUrl} 
                        key={key}
                        width={300}
                        height={300}
                        style={{
                            objectFit: 'cover',
                            borderRadius: data.hasOpepen ? '0 150px 150px 150px' : 16
                        }}
                    />
                )
            })}
        </div>
    );
}
