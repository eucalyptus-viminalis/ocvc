import { useContext } from "react";
import { getVanityData } from "./data";
import { GlobalContext } from "../../GlobalContext";
import { useQuery } from "@tanstack/react-query";

type TasteProps = {
    fid: number;
};

export async function Vanity(props: TasteProps) {
    const { fid } = props;
    const context = useContext(GlobalContext);
    const { vanity, setVanity } = context;
    const { isPending, error, data } = useQuery({
        queryKey: ["vanityData"],
        queryFn: () => getVanityData(fid),
    });
    if (isPending) return "Loading...";
    if (error) return "Error occured.";

    const updateHasOpepen = () => {
        setVanity((prev) => {
            if (prev.hasOpepen) {
                return {
                    ...prev,
                    hasOpepen: undefined,
                };
            } else {
                return {
                    ...prev,
                    hasOpepen: data!.hasOpepen,
                };
            }
        });
    };
    const updatePfpUrls = (i: number) => {
        const selectedPfpUrl = data!.pfpUrls!.at(i)!;
        setVanity((prev) => {
            return {
                ...prev,
                pfpUrls: [selectedPfpUrl],
            };
        });
    };

    const updateEnsNames = (i: number) => {
        const selectedName = data!.ensNames!.at(i)!;
        setVanity((prev) => {
            if (prev.ensNames) {
                if (prev.ensNames.includes(selectedName)) {
                    return {
                        ...prev,
                        ensNames: prev.ensNames.filter(
                            (item) => item !== selectedName
                        ),
                    };
                } else {
                    return {
                        ...prev,
                        ensNames: [...prev.ensNames, selectedName],
                    };
                }
            } else {
                return {
                    ...prev,
                    ensNames: [data!.ensNames!.at(i)!],
                };
            }
        });
    };
    const clear = () => {
        setVanity({});
    };

    return (
        <div className="flex flex-row bg-blue-800">
            <div className="flex flex-col gap-5">
                {data.ensNames?.map((ensName, i) => {
                    const key = `ensName${i}`;
                    return (
                        <button
                            className="p-4 hover:opacity-80 hover:cursor-pointer flex flex-col border rounded"
                            key={key}
                            onClick={() => updateEnsNames(i)}
                        >
                            <span className="text-green-600">{ensName}</span>
                        </button>
                    );
                })}
                {data.pfpUrls?.map((pfpUrl, i) => {
                    const key = `pfp${i}`;
                    return (
                        <button
                            className="p-4 hover:opacity-80 hover:cursor-pointer flex flex-col border rounded"
                            key={key}
                            onClick={() => updatePfpUrls(i)}
                            disabled={
                                vanity.pfpUrls
                                    ? vanity.pfpUrls.length > 0
                                    : false
                            }
                        >
                            <img
                                src={pfpUrl}
                                width={300}
                                height={300}
                                style={{
                                    objectFit: "cover",
                                    borderRadius: data.hasOpepen
                                        ? "0 150px 150px 150px"
                                        : 16,
                                }}
                            />
                        </button>
                    );
                })}
            </div>
            <div id="right" className="flex flex-col gap-5 w-1/3">
                <button onClick={clear}>Clear</button>
                <p>{JSON.stringify(vanity, null, 2)}</p>
                <h2>Selected ENS names</h2>
                {vanity.ensNames && vanity.ensNames.length > 0 ? (
                vanity.ensNames.map((name, i) => {
                    const key = `ensName${i}`;
                    return <span key={key}>{name}</span>;
                })
                ) : (
                    <span>None selected</span>
                )}
                <h2>Selected PFP</h2>
                {vanity.pfpUrls && data.hasOpepen ? (
                    <div>
                        <p>You have an opepen so you can add extra vanity</p>
                        <button
                            className="p-4 hover:opacity-80 hover:cursor-pointer flex flex-col border rounded"
                            onClick={updateHasOpepen}
                        >
                            {vanity.hasOpepen
                                ? "Remove extra vanity!"
                                : "Apply extra vanity now!"}
                        </button>
                    </div>
                ) : null}
                {vanity.pfpUrls?.map((pfp, i) => {
                    const key = `pfp${i}`;
                    return (
                        <img
                            key={key}
                            src={pfp}
                            width={300}
                            height={300}
                            style={{
                                objectFit: "cover",
                                borderRadius: vanity.hasOpepen
                                    ? "0 150px 150px 150px"
                                    : 0,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
