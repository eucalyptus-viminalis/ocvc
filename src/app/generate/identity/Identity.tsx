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
        <div className="flex flex-row gap-10">
            <div className="flex flex-col gap-10 w-1/3">
                <div
                    onClick={updateFid}
                    id="fid"
                    className="p-4 hover:opacity-80 hover:cursor-pointer flex flex-col border rounded"
                >
                    <span>FID</span>
                    <span>{data.fid}</span>
                </div>
                {data.eth_addresses?.map((ethAddy, i) => {
                    const key = `ethAddy${i}`;
                    return (
                        <div
                            key={key}
                            onClick={() => updateEthAddresses(i)}
                            className="p-4 hover:opacity-80 hover:cursor-pointer flex flex-col border rounded"
                        >
                            <span>eth addy {i}</span>
                            <span>{ethAddy}</span>
                        </div>
                    );
                })}
            </div>
            <div id="right" className="flex flex-col gap-5">
                <button onClick={clear}>Clear</button>
                <Link href='status'>Done</Link>
                <p>{JSON.stringify(identity, null, 2)}</p>
                <span>fid: {identity?.fid}</span>
                <span>eth addys:</span>
                {identity.eth_addresses?.map((ethAddy, i) => {
                    const key = `ethAddyInContext${i}`;
                    return <div key={key}>{ethAddy}</div>;
                })}
            </div>
        </div>
    );
}
