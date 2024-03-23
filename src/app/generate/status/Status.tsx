import { getData } from "./data";

type StatusProps = {
    fid: number;
};

export async function Status(props: StatusProps) {
    const { fid } = props;
    const data = await getData(fid);

    return (
        <>
            {data.fcFollowerCount ? (
                <div>
                    <span>FC follower count</span>
                    <span>{data.fcFollowerCount}</span>
                </div>
            ) : null}
            {data.firstTxOnBase ? (
                <div>
                    <span>1st token transfer on Base!</span>
                    <span>{data.firstTxOnBase.timestamp}</span>
                    <span>{data.firstTxOnBase.txHash}</span>
                </div>
            ) : null}
            {data.firstTxOnEth ? (
                <div>
                    <span>1st token transfer on Ethereum!</span>
                    <span>{data.firstTxOnEth.timestamp}</span>
                    <span>{data.firstTxOnEth.txHash}</span>
                </div>
            ) : null}
        </>
    );
}
