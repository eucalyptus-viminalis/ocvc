"use client"
import { useContext } from "react";
import { getVanityData } from "./data";
import { GlobalContext } from "../../GlobalContext";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

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

    if (isPending) return "Loading...";
    if (error) return "Error occured.";

    return (
        <div className="flex flex-row gap-8 w-full justify-between">
            <div id="left" className="flex flex-col gap-10 w-1/3">
                <h2 className="text-3xl">Available</h2>
                <div className="flex flex-col gap-5">
                    {data.ensNames?.map((ensName, i) => {
                        const key = `ensName${i}`;
                        return (
                            <button
                                className="p-4 hover:opacity-80 hover:cursor-pointer flex flex-col border rounded"
                                key={key}
                                onClick={() => updateEnsNames(i)}
                            >
                                <span className="text-green-600">
                                    {ensName}
                                </span>
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
            </div>
            <div id="right" className="flex w-1/3 flex-col gap-5">
                <h3 className="text-3xl">Selected</h3>
                <button className="border p-2 hover:opacity-70" onClick={clear}>
                    Clear
                </button>
                <span>ens names:</span>
                {vanity.ensNames && vanity.ensNames.length !== 0
                    ? vanity.ensNames.map((name, i) => {
                          const key = `ensNameInContext${i}`;
                          return (
                              <div
                                  key={key}
                                  className="break-words border w-fit p-2 bg-green-800"
                              >
                                  {name}
                              </div>
                          );
                      })
                    : "None"}
                <h2>pfp:</h2>
                {vanity.pfpUrls && vanity.pfpUrls.length > 0 ? (
                    <img
                        src={vanity.pfpUrls.at(0)}
                        alt="pfp"
                        width={300}
                        height={300}
                        style={{
                            objectFit: "cover",
                            borderRadius: vanity.hasOpepen
                                ? "0 150px 150px 150px"
                                : 0,
                        }}
                    />
                ) : null}
                {vanity.pfpUrls &&
                vanity.pfpUrls.length > 0 &&
                data.hasOpepen ? (
                    <div>
                        <p className="opacity-70">You have an opepen so you can add extra vanity</p>
                        <button
                            className="p-2 px-8 hover:opacity-70 hover:cursor-pointer flex flex-col border"
                            onClick={updateHasOpepen}
                        >
                            {vanity.hasOpepen
                                ? "Remove extra vanity!"
                                : "Apply extra vanity now!"}
                        </button>
                    </div>
                ) : null}
                {vanity.ensNames || vanity.pfpUrls ? (
                    <Link className="text-center border p-2 px-8 hover:opacity-70 w-full" href={'/generate/taste'}>Next</Link>
                ) : null}
            </div>
        </div>
    );
}
