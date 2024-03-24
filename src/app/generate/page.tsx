"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Identity } from "./identity/Identity";
import { Suspense } from "react";
import { Status } from "./status/Status";
import { Taste } from "./taste/Taste";
import { Vanity } from "./vanity/Vanity";
import Link from "next/link";
import Login from "../Login";

export default function GeneratePage() {
    const { user, ready, authenticated } = usePrivy();
    const fid = user?.farcaster?.fid;

    if (!ready) return 'Loading account...'
    if (ready && !authenticated) {
        return (
            <Login/>
        )
    }

    return (
        <div>
            <h1>Generate</h1>
            <p>Logged in as: {user?.farcaster?.username}</p>
            <p>Start with Identity</p>
            <Link href={'generate/identity'}>Identity</Link>
        </div>
    );
}
