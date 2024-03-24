// "use client";
import { useContext } from "react";
import { getIdentityData } from "./data";
import { useQuery } from "@tanstack/react-query";
import { GlobalContext } from "../../GlobalContext";
import Link from "next/link";

type IdentityProps = {
    fid: number;
};

export async function Identity(props: IdentityProps) {
    const { fid } = props;
    const context = useContext(GlobalContext);
    const { identity, setIdentity } = context;
    const { isPending, error, data } = useQuery({
        queryKey: ["identityData"],
        queryFn: () => getIdentityData(fid),
    });
    const updateFname = () => {
        setIdentity((prev) => {
            if (prev.fname) {
                return {
                    ...prev,
                    fname: undefined,
                };
            } else {
                return { ...prev, fname: data?.fname };
            }
        });
    };
    const updateFid = () => {
        setIdentity((prev) => {
            if (prev.fid) {
                return {
                    eth_addresses: prev.eth_addresses,
                    fid: undefined,
                };
            } else {
                return { ...prev, fid };
            }
        });
    };
    const updateEthAddresses = (i: number) => {
        const selectedAddress = data!.eth_addresses!.at(i)!;
        setIdentity((prev) => {
            if (prev.eth_addresses) {
                if (prev.eth_addresses.includes(selectedAddress)) {
                    return {
                        ...prev,
                        eth_addresses: prev.eth_addresses.filter(
                            (item) => item !== selectedAddress
                        ),
                    };
                } else {
                    return {
                        ...prev,
                        eth_addresses: [...prev.eth_addresses, selectedAddress],
                    };
                }
            } else {
                return {
                    ...prev,
                    eth_addresses: [data!.eth_addresses!.at(i)!],
                };
            }
        });
    };

    if (isPending) return "Loading...";
    if (error) return "Error occured.";

    const clear = () => {
        setIdentity({});
    };
    return (
        <div className="flex flex-row gap-10 w-full justify-between">
            <div id="left" className="flex flex-col gap-10 w-1/3">
                <h2 className="text-3xl">Available</h2>
                <div
                    onClick={updateFname}
                    id="fname"
                    className="p-4 hover:opacity-80 gap-2 hover:cursor-pointer flex flex-col border rounded"
                >
                    <span className="opacity-70">Farcaster Name</span>
                    <span>{data.fname}</span>
                </div>
                <div
                    onClick={updateFid}
                    id="fid"
                    className="p-4 hover:opacity-80 gap-2 hover:cursor-pointer flex flex-col border rounded"
                >
                    <span className="opacity-70">FID</span>
                    <span>{data.fid}</span>
                </div>

                {data.eth_addresses?.map((ethAddy, i) => {
                    const key = `ethAddy${i}`;
                    return (
                        <div
                            key={key}
                            onClick={() => updateEthAddresses(i)}
                            className="p-4 hover:opacity-80 gap-2 hover:cursor-pointer flex flex-col border rounded"
                        >
                            <span className="opacity-70">eth addy #{i}</span>
                            <span className="break-words">{ethAddy}</span>
                        </div>
                    );
                })}
            </div>
            <div id="right" className="flex w-1/3 flex-col gap-5">
                <h3 className="text-3xl">Selected</h3>
                <button className="border p-2 hover:opacity-70" onClick={clear}>
                    Clear
                </button>
                <div className="flex flex-col gap-2">
                    <span>fid:</span>
                    {identity.fid ? (
                        <span className="p-2 border bg-green-700">
                            {identity.fid}
                        </span>
                    ) : (
                        <span>None</span>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <span>fname:</span>
                    {identity.fname ? (
                        <span className="p-2 border bg-green-700">
                            {identity.fname}
                        </span>
                    ) : (
                        <span>None</span>
                    )}
                </div>
                <span>eth addys:</span>
                {identity.eth_addresses && identity.eth_addresses.length !== 0
                    ? identity.eth_addresses?.map((ethAddy, i) => {
                          const key = `ethAddyInContext${i}`;
                          return <div key={key} className="break-words border p-2 bg-green-700">{ethAddy}</div>;
                      })
                    : "None"}
                {identity.fname && identity.fid ? (
                    <Link className="text-center border p-2 px-8 hover:opacity-70 w-full" href={'/generate/status'}>Next</Link>
                ) : null}

            </div>
        </div>
    );
}
