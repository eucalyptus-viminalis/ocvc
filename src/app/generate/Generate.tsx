"use client";
import { useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { generateVibeCheck } from "@/prisma/generate";
import { appConfig } from "../appConfig";
import Link from "next/link";

export default function Generate() {
    const context = useContext(GlobalContext);
    const [generating, setGenerating] = useState(false);
    const [fid, setFid] = useState<number>();
    const [generationFailed, setGenerationFailed] = useState<boolean>();
    const { identity, status, taste, vanity } = context;
    const generate = async () => {
        try {
            setGenerating(true);
            const data = await generateVibeCheck({
                identity,
                status,
                taste,
                vanity,
            });
            if (data.identity.fid) {
                setFid(data.identity.fid);
            }
        } catch {
            setGenerationFailed(true);
        } finally {
            setGenerating(false);
        }
    };
    return (
        <>
            <button
                className="border p-2 px-8 hover:opacity-70 border-green-400"
                onClick={generate}
            >
                Generate!
            </button>
            {generating ? (
                <div className="gap-6 items-center top-0 left-0 fixed z-50 w-full h-full bg-black opacity-90 border flex flex-col text-center justify-center align-middle">
                    {fid ? (
                        <div className="flex flex-col">
                            <span>your vibe check is ready!</span>
                            <Link
                                className="border p-2 px-8 text-lg hover:opacity-70"
                                href={appConfig.host + "/" + fid}
                            >
                                Go to my vibe check
                            </Link>
                        </div>
                    ) : (
                        <span>Generating... </span>
                    )}
                </div>
            ) : null}
            {!generating && fid ? (
                <div className="gap-6 items-center fixed z-50 w-full h-full bg-black opacity-90 border flex flex-col text-center justify-center align-middle">
                    <span>Your vibe check is ready!</span>
                    <Link
                        className="p-2 w-fit px-8 border hover:opacity-70"
                        href={"/" + identity.fid!}
                    >
                        Check my vibe check
                    </Link>
                </div>
            ) : null}
            {generationFailed ? (
                <div className="gap-6 top-0 left-0 items-center fixed z-50 w-full h-full bg-black opacity-90 border flex flex-col text-center justify-center align-middle">
                    <span>Unable to generate your vibe check.</span>
                    {identity.fid ? (
                        <div className="flex w-full align-middle items-center justify-center flex-col gap-4">
                            <span>
                                You may have already generated your ocvc*
                            </span>
                            <Link
                                className="p-2 w-fit px-8 border hover:opacity-70"
                                href={"/" + identity.fid!}
                            >
                                Check my vibe check
                            </Link>
                        </div>
                    ) : null}
                    <button
                        className="border w-fit p-2 px-8 hover:opacity-70"
                        onClick={() => setGenerationFailed(false)}
                    >
                        OK
                    </button>
                </div>
            ) : null}
        </>
    );
}
