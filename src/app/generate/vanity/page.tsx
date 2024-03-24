"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Suspense, useContext, useEffect, useState } from "react";
import Login from "../../Login";
import { Vanity } from "./Vanity";
import { GlobalContext } from "../../GlobalContext";
import Link from "next/link";
import Links from "../Links";

export default function VanityPage() {
    const [fid, setFid] = useState<number | undefined | null>();
    const { user, ready, authenticated } = usePrivy();
    const {identity,status,taste,vanity,} = useContext(GlobalContext)

    useEffect(() => {
        if (ready && authenticated) {
            setFid(user?.farcaster?.fid);
        }
    }, [user, ready, authenticated]);

    if (!ready) {
        return "We're loading your Login data..."
    }

    // const fid = user?.farcaster?.fid;
    if (ready && !authenticated) {
        return <Login />;
    }

    return (
        <div className="flex flex-col w-full">
            <div
            className="flex flex-row justify-between"  
            >
                <div
                    id="left"
                    className="flex flex-col" 
                >
                    <h2 className="text-2xl">Vanity</h2>
                    <p>Logged in as: {user?.farcaster?.username}</p>
                    <p>fid set?: {fid}</p>
                </div>
                <div
                    id="right"
                    className="flex flex-col" 
                >
                    <Links/>
                </div>

            </div>
            {fid ? (
                <Suspense >
                    <Vanity fid={fid}/>
                </Suspense>
            ) : null}
        </div>
    );
}
