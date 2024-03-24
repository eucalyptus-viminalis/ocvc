"use client";

import { useQuery } from "@tanstack/react-query";
import { getVibeCheckData } from "./data";
import { useEffect, useState } from "react";

type VibeCheckProps = {
    fid: number;
};

export async function VibeCheck(props: VibeCheckProps) {
    const { fid } = props;
    const [copied, setCopied] = useState<boolean>();
    const [copiedDebugURL, setCopiedDebugURL] = useState<boolean>();

    const { isPending, error, data } = useQuery({
        queryKey: ["vanityData"],
        queryFn: () => getVibeCheckData(fid),
    });
    const urlParams = new URLSearchParams();
    urlParams.set("url", "https://ocvc.vercel.app/" + fid + '/frame');
    const debuggerUrl = "https://warpcast.com/~/developers/frames?" + urlParams;
    const copy = () => {
        navigator.clipboard.writeText("https://ocvc.vercel.app/" + fid + '/frame');
        setCopied(true);
    };
    const copyDebugUrl = () => {
        const urlParams = new URLSearchParams();
        urlParams.set("url", "https://ocvc.vercel.app/" + fid + '/frame');
        navigator.clipboard.writeText(
            "https://warpcast.com/~/developers/frames?" + urlParams + '/frame'
        );
        setCopied(true);
    };
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
                    <span className="bold text-4xl">
                        {data.fname + `s OCVC* frame URL:`}
                    </span>
                    <span className="">
                        {"https://ocvc.vercel.app/" + data.fid + '/frame'}
                    </span>
                    {copied ? (
                        <span>Copied!</span>
                    ) : (
                        <button
                            onClick={copy}
                            className="border p-2 w-fit px-8 hover:opacity-70"
                        >
                            clipboard
                        </button>
                    )}
                    <span className="text-sm opacity-70">
                        hint: copy the url above and include it in your cast or
                        try in the Warpcast debugger
                    </span>
                    <a
                    target='_blank'
                        href={debuggerUrl}
                        className="border text-blue-500 p-2 w-fit px-8 hover:opacity-70"
                    >
                        try in debugger
                    </a>
                </div>
            ) : (
                <span>fc user #{fid} has not generated their OCVC*</span>
            )}
        </div>
    );
}
