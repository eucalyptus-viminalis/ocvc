"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Suspense, useEffect, useState } from "react";
import Login from "../../Login";
import { Status } from "./Status";

export default function StatusPage() {
    const [fid, setFid] = useState<number | undefined | null>();
    const { user, ready, authenticated } = usePrivy();

    useEffect(() => {
        if (ready && authenticated) {
            setFid(user?.farcaster?.fid);
        }
    }, [user, ready, authenticated]);

    // const fid = user?.farcaster?.fid;
    if (ready && !authenticated) {
        return <Login />;
    }

    return (
        <div className="flex flex-col w-full gap-4 mt-4">
            <h2 className="text-6xl">Status</h2>
            <hr className="w-full"></hr>
            {fid ? (
                <Suspense>
                    <Status fid={fid}/>
                </Suspense>
            ) : null}
        </div>
    );
}
