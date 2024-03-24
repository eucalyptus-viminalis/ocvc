"use client"
import Link from "next/link";
import Login from "./Login";
import { usePrivy } from "@privy-io/react-auth";
import LatestChecks from "./LatestChecks";
import { Suspense, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MainButtons from "./MainButtons";

export default function Home() {
  // const checks = getData()
  const {ready, authenticated, user} = usePrivy()
    const [fidLoggedIn, setFidLoggedIn] = useState<number|null>()

    useEffect(() => {
        if (ready && authenticated) {
            setFidLoggedIn(user?.farcaster?.fid);
        }
    }, [user, ready, authenticated]);
  return (
    <>
        <h1 className="text-9xl">OCVC*</h1>
        <span>onchain vibe check*</span>

        {fidLoggedIn ? (
          <MainButtons fid={fidLoggedIn}/>
        ) : 
        (
          <Login/>
        )}
        <hr className="border-blue-900 m-10 w-full"></hr>
        <h1 className="text-4xl">Latest generated</h1>
        <Suspense fallback={'Loading...'}>
          <LatestChecks />
        </Suspense>
        <hr className="border-blue-900 m-10 w-full"></hr>
        <span className="text-xs opacity-30">* sufficiently onchain</span>
    </>
  );
}
