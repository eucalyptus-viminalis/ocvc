// "use server"
import { useContext } from "react";
import { getStatusData } from "./data";
import { GlobalContext } from "../../GlobalContext";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type StatusProps = {
    fid: number;
};

export async function Status(props: StatusProps) {
    const { fid } = props;
    const context = useContext(GlobalContext);
    const { status, setStatus } = context;
    const { isPending, error, data } = useQuery({
        queryKey: ["statusData"],
        queryFn: () => getStatusData(fid),
    });

    const updateFollowerCount = () => {
        setStatus((prev) => {
            if (prev.fcFollowerCount) {
                return {
                    ...prev,
                    fcFollowerCount: undefined,
                };
            } else {
                return { ...prev, fcFollowerCount: data?.fcFollowerCount };
            }
        });
    };
    const updateFirstTxOnBase = () => {
        setStatus((prev) => {
            if (prev.firstTxOnBase) {
                return {
                    ...prev,
                    firstTxOnBase: undefined,
                };
            } else {
                return {
                    ...prev,
                    firstTxOnBase: data?.firstTxOnBase,
                };
            }
        });
    };

    const updateFirstTxOnEth = () => {
        setStatus((prev) => {
            if (prev.firstTxOnEth) {
                return {
                    ...prev,
                    firstTxOnEth: undefined,
                };
            } else {
                return {
                    ...prev,
                    firstTxOnEth: data?.firstTxOnEth,
                };
            }
        });
    };

    const updateFcEngagementScore = () => {
        setStatus((prev) => {
            if (prev.fcEngagementScore) {
                return {
                    ...prev,
                    fcEngagementScore: undefined,
                };
            } else {
                return {
                    ...prev,
                    fcEngagementScore: data?.fcEngagementScore,
                };
            }
        });
    };
    const updateFcFollowingScore = () => {
        setStatus((prev) => {
            if (prev.fcFollowingScore) {
                return {
                    ...prev,
                    fcFollowingScore: undefined,
                };
            } else {
                return {
                    ...prev,
                    fcFollowingScore: data?.fcFollowingScore,
                };
            }
        });
    };

    if (isPending) return "Loading...";
    if (error) return "Error occured.";

    const clear = () => {
        setStatus({});
    };

    return (
        <div className="flex flex-row gap-8">
            <div className="flex flex-col gap-8 w-1/3 break-words">
                {data.fcFollowerCount ? (
                    <div
                        onClick={updateFollowerCount}
                        id="followerCount"
                        className="p-4 hover:opacity-80 hover:cursor-pointer flex flex-col border rounded"
                    >
                        <span>FC follower count</span>
                        <span>{data.fcFollowerCount}</span>
                    </div>
                ) : null}
                {data.firstTxOnBase ? (
                    <div
                        onClick={updateFirstTxOnBase}
                        id="firstTxOnBase"
                        className="p-4 hover:opacity-80 hover:cursor-pointer flex flex-col border rounded"
                    >
                        <span>1st token transfer on Base!</span>
                        <span>{data.firstTxOnBase.timestamp}</span>
                        <span>{data.firstTxOnBase.txHash}</span>
                    </div>
                ) : null}
                {data.firstTxOnEth ? (
                    <div
                        onClick={updateFirstTxOnEth}
                        id="firstTxOnEth"
                        className="p-4 hover:opacity-80 hover:cursor-pointer flex flex-col border rounded"
                    >
                        <span>1st token transfer on Ethereum!</span>
                        <span>{data.firstTxOnEth.timestamp}</span>
                        <span>{data.firstTxOnEth.txHash}</span>
                    </div>
                ) : null}
                {data.fcFollowingScore ? (
                    <div
                        onClick={updateFcFollowingScore}
                        id="followingScore"
                        className="p-4 hover:opacity-80 hover:cursor-pointer flex flex-col border rounded"
                    >
                        <span>farcaster following score</span>
                        <span>rank: {data.fcFollowingScore.rank}</span>
                        <span>score: {data.fcFollowingScore.score}</span>
                        <span>
                            percentile: {data.fcFollowingScore.percentile}
                        </span>
                    </div>
                ) : null}
                {data.fcEngagementScore ? (
                    <div
                        onClick={updateFcEngagementScore}
                        id="engagementScore"
                        className="p-4 hover:opacity-80 hover:cursor-pointer flex flex-col border rounded"
                    >
                        <span>farcaster engagement score</span>
                        <span>rank: {data.fcEngagementScore.rank}</span>
                        <span>score: {data.fcEngagementScore.score}</span>
                        <span>
                            percentile: {data.fcEngagementScore.percentile}
                        </span>
                    </div>
                ) : null}
            </div>
            <div id="right" className="flex flex-col w-1/3">
                <button onClick={clear}>Clear</button>
                <Link href='vanity'>Done</Link>
                <h1>Including these vibes</h1>
                <p>{JSON.stringify(status, null, 2)}</p>
            </div>
        </div>
    );
}
