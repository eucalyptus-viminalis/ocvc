"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Identity } from "./identity/Identity";
import { Suspense } from "react";
import { Status } from "./status/Status";
import { Taste } from "./taste/Taste";
import { Vanity } from "./vanity/Vanity";

export default function GeneratePage() {
    const { user, ready, authenticated } = usePrivy();
    const fid = user?.farcaster?.fid;

    return (
        <div>
            <h1>Generate</h1>
            <h2 className="text-2xl">Identity</h2>
            <p>Logged in as: {user?.farcaster?.username}</p>
            <p>Select your name:</p>
            {ready && fid ? (
                <div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Identity fid={fid} />
                    </Suspense>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Status fid={fid} />
                    </Suspense>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Taste fid={fid} />
                    </Suspense>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Vanity fid={fid} />
                    </Suspense>
                </div>
            ) : null}
        </div>
    );
}
