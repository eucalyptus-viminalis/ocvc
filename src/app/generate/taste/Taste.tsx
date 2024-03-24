"use client"
import { useContext } from "react";
import { getTasteData } from "./data";
import { GlobalContext } from "../../GlobalContext";
import { useQuery } from "@tanstack/react-query";

type TasteProps = {
    fid: number;
};

export async function Taste(props: TasteProps) {
    const { fid } = props;
    const context = useContext(GlobalContext);
    const { taste, setTaste } = context;
    const { isPending, error, data } = useQuery({
        queryKey: ["tasteData"],
        queryFn: () => getTasteData(fid),
    });

    const updateTaste = (i: number) => {
        const selectedToken = data!.latestTokenTransfers!.at(i)!;
        setTaste((prev) => {
            if (prev.latestTokenTransfers) {
                if (prev.latestTokenTransfers.includes(selectedToken)) {
                    return {
                        ...prev,
                        latestTokenTransfers: prev.latestTokenTransfers.filter(
                            (item) => item !== selectedToken
                        ),
                    };
                } else {
                    return {
                        ...prev,
                        latestTokenTransfers: [
                            ...prev.latestTokenTransfers,
                            selectedToken,
                        ],
                    };
                }
            } else {
                return {
                    ...prev,
                    latestTokenTransfers: [data!.latestTokenTransfers!.at(i)!],
                };
            }
        });
    };

    const clear = () => {
        setTaste({});
    };

    if (isPending) return "Loading...";
    if (error) return "Error occured.";

    return (
        <div className="flex flex-row gap-8 w-full justify-between">
            <div id="left" className="flex flex-col gap-10 w-1/3">
                <h2 className="text-3xl">Available</h2>
                {data?.latestTokenTransfers?.map((tokenTransfer, i) => {
                    const key = `tokenTransfer${i}`;
                    return (
                        <button
                            className="p-4 hover:opacity-80 hover:cursor-pointer flex flex-col border rounded"
                            key={key}
                            disabled={
                                taste.latestTokenTransfers
                                    ? taste.latestTokenTransfers.length >= 3
                                    : false
                            }
                            onClick={() => updateTaste(i)}
                        >
                            <img
                                src={
                                    tokenTransfer.tokenNft.contentValue.image
                                        .medium
                                }
                                width={300}
                                height={300}
                                style={{
                                    objectFit: "scale-down",
                                    borderRadius: 16,
                                }}
                            />
                        </button>
                    );
                })}
            </div>
            <div id="right" className="flex w-1/3 flex-col gap-5">
                <h3 className="text-3xl">Selected</h3>
                <span className="text-lg opacity-30">select up to 3</span>
                <button className="border p-2 hover:opacity-70" onClick={clear}>
                    Clear
                </button>
                <span>pictures:</span>
                {taste.latestTokenTransfers && taste.latestTokenTransfers.length > 0 ? (

                taste.latestTokenTransfers?.map((token, i) => {
                    const key = `tokenTransfer${i}`;
                    return (
                        <img
                            key={key}
                            src={token.tokenNft.contentValue.image.medium}
                            width={300}
                            height={300}
                            style={{
                                objectFit: "scale-down",
                                borderRadius: 16,
                            }}
                        />
                    );
                })
                ) : 'None'}
            </div>
        </div>
    );
}
