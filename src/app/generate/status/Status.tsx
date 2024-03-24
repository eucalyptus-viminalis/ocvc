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
        <div className="flex flex-row gap-8 w-full justify-between">
            <div id="left" className="flex flex-col gap-10 w-1/3">
                <h2 className="text-3xl">Available</h2>
                {data.fcFollowerCount ? (
                    <div
                        onClick={updateFollowerCount}
                        id="followerCount"
                    className="p-4 hover:opacity-80 gap-2 hover:cursor-pointer flex flex-col border rounded"
                    >
                        <span className="opacity-70">FC follower count</span>
                        <span>{data.fcFollowerCount}</span>
                    </div>
                ) : null}
                {data.firstTxOnBase ? (
                    <div
                        onClick={updateFirstTxOnBase}
                        id="firstTxOnBase"
                        className="p-4 gap-2 break-words hover:opacity-80 hover:cursor-pointer flex flex-col border rounded"
                    >
                        <span className="opacity-70">1st token transfer on Base!</span>
                        <span>{data.firstTxOnBase.timestamp}</span>
                        <span>{data.firstTxOnBase.txHash}</span>
                    </div>
                ) : null}
                {data.firstTxOnEth ? (
                    <div
                        onClick={updateFirstTxOnEth}
                        id="firstTxOnEth"
                        className="p-4 gap-2 break-words hover:opacity-80 hover:cursor-pointer flex flex-col border rounded"
                    >
                        <span className="opacity-70">1st token transfer on Ethereum!</span>
                        <span>{data.firstTxOnEth.timestamp}</span>
                        <span>{data.firstTxOnEth.txHash}</span>
                    </div>
                ) : null}
                {data.fcFollowingScore ? (
                    <div
                        onClick={updateFcFollowingScore}
                        id="followingScore"
                        className="p-4 gap-2 break-words hover:opacity-80 hover:cursor-pointer flex flex-col border rounded"
                    >
                        <span className="opacity-70">farcaster following score</span>
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
                        className="p-4 gap-2 break-words hover:opacity-80 hover:cursor-pointer flex flex-col border rounded"
                    >
                        <span className="opacity-70">farcaster engagement score</span>
                        <span>rank: {data.fcEngagementScore.rank}</span>
                        <span>score: {data.fcEngagementScore.score}</span>
                        <span>
                            percentile: {data.fcEngagementScore.percentile}
                        </span>
                    </div>
                ) : null}
            </div>
            <div id="right" className="flex w-1/3 flex-col gap-5">
                <h3 className="text-3xl">Selected</h3>
                <button className="border p-2 hover:opacity-70" onClick={clear}>
                    Clear
                </button>
                <div className="flex flex-col gap-2">
                    <span>fcFollowerCount:</span>
                    {status.fcFollowerCount ? (
                        <span className="p-2 border bg-green-800 w-fit">
                            {status.fcFollowerCount}
                        </span>
                    ) : (
                        <span>None</span>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <span>1st tx on base:</span>
                    {status.firstTxOnBase ? (
                        <span className="p-2 border bg-green-800 w-fit">
                            {status.firstTxOnBase.timestamp}
                        </span>
                    ) : (
                        <span>None</span>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <span>1st tx on ethereum:</span>
                    {status.firstTxOnEth ? (
                        <span className="p-2 border bg-green-800 w-fit">
                            {status.firstTxOnEth.timestamp}
                        </span>
                    ) : (
                        <span>None</span>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <span>fc following score:</span>
                    {status.fcFollowingScore ? (
                        <span className="p-2 w-fit border bg-green-800">
                            {'rank #' + status.fcFollowingScore.rank}
                        </span>
                    ) : (
                        <span>None</span>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <span>fc engagement score:</span>
                    {status.fcEngagementScore ? (
                        <span className="p-2 w-fit border bg-green-900">
                            {'rank #' + status.fcEngagementScore.rank}
                        </span>
                    ) : (
                        <span>None</span>
                    )}
                </div>
                <Link className="text-center border p-2 px-8 hover:opacity-70 w-full" href={'/generate/vanity'}>Next</Link>
            </div>
        </div>
    );
}
