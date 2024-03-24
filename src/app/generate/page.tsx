"use client";

import { usePrivy } from "@privy-io/react-auth";
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
        <div className="m-4 flex flex-col gap-10 align-middle w-full justify-center">
            <p className="text-9xl">Start with Identity</p>
            <Link className="w-fit text-5xl border p-2 hover:opacity-80" href={'generate/identity'}>Identity</Link>
        </div>
    );
}
