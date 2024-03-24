"use client"

import { useQuery } from "@tanstack/react-query";
import { getVibeCheckData } from "./data";
import { useEffect, useState } from "react";

type VibeCheckProps = {
    fid: number
}

export async function VibeCheck(props: VibeCheckProps) {
    const {fid} = props
    const [copied, setCopied] = useState<boolean>()
    const { isPending, error, data } = useQuery({
        queryKey: ["vanityData"],
        queryFn: () => getVibeCheckData(fid),
    });

    const copy = () => {
        navigator.clipboard.writeText("https://ocvc.vercel.app/" + fid)
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
            {data ? (
                <div className="flex flex-col gap-4 w-full">
                    <span className="bold text-4xl">{data.fname}'s OCVC* frame URL:</span>
                    <span className="">{'https://ocvc.vercel.app/' + data.fid}</span>
                    {copied? (
                        <span>Copied!</span>
                    ) : <button onClick={copy} className="border p-2 w-fit px-8 hover:opacity-70">clipboard</button>}
                    <span className="text-sm opacity-70">hint: copy the url above and include it in your cast</span>
                </div>
            ) : (
                <span>fc user #{fid} has not generated their OCVC*</span>
            )}
        </div>
    )

}