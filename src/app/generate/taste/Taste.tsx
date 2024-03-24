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
    if (isPending) return "Loading...";
    if (error) return "Error occured.";

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
    // const updateTaste = (i: number) => {
    //     const selectedToken = data!.latestTokenTransfers!.at(i)!;
    //     setTaste((prev) => {
    //         if (prev.latestTokenTransfers) {
    //             const existingToken = prev.latestTokenTransfers.find(item => item.tokenNft.tokenId === selectedToken.tokenNft.tokenId);
    //             if (existingToken) {
    //                 // Token already exists, remove it
    //                 return {
    //                     ...prev,
    //                     latestTokenTransfers: prev.latestTokenTransfers.filter(item => item.tokenNft.tokenId !== selectedToken.tokenNft.tokenId)
    //                 };
    //             } else {
    //                 // Token doesn't exist, add it
    //                 return {
    //                     ...prev,
    //                     latestTokenTransfers: [...prev.latestTokenTransfers, selectedToken]
    //                 };
    //             }
    //         } else {
    //             // No previous data, create new entry
    //             return {
    //                 latestTokenTransfers: [selectedToken]
    //             };
    //         }
    //     });
    // };
    const clear = () => {
        setTaste({});
    };

    return (
        <div className="flex flex-row">
            <div id="left" className="flex flex-col gap-5">
                <button onClick={clear}>Clear</button>
                {data!.latestTokenTransfers!.map((tokenTransfer, i) => {
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
            <div id="right" className="flex flex-col gap-5 w-1/3 break-words">
                <p>{JSON.stringify(taste, null, 2)}</p>
                {taste.latestTokenTransfers?.map((token, i) => {
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
                })}
            </div>
        </div>
    );
}
