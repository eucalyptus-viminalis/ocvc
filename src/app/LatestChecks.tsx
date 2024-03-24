"use client"
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { useQuery } from "@tanstack/react-query";
import { getLatestChecksData } from "./data";

export default async function LatestChecks() {

    const { isPending, error, data } = useQuery({
        queryKey: ["latestChecksData"],
        queryFn: () => getLatestChecksData(),
    });
    const [copied, setCopied] = useState<boolean>()

    const copy = (i: number) => {
        navigator.clipboard.writeText("https://ocvc.vercel.app/" + data!.at(i)!.fid)
        setCopied(true)
    }
    useEffect(() => {
        if (copied) {
            const timeoutId = setTimeout(() => {
                setCopied(false);
            }, 2000);

            return () => clearTimeout(timeoutId); // Cleanup function to clear timeout if component unmounts
        }
    }, [copied]);
    if (isPending) return "Loading...";
    if (error) return "Error occured.";

    return (
        <div>
            {data.map((d,i) => {
                return (
                <div className="border p-2 flex flex-col gap-4 w-full">
                    <span className="bold text-4xl">{d.fname}'s OCVC* frame URL:</span>
                    <span className="">{'https://ocvc.vercel.app/' + d.fid}</span>
                    {copied? (
                        <span>Copied!</span>
                    ) : <button onClick={() => copy(i)} className="border p-2 w-fit px-8 hover:opacity-70">clipboard</button>}
                    <span className="text-sm opacity-70">hint: copy the url above and include it in your cast</span>
                </div>
            )
            })}
        </div>
    )
}