"use client"
import Link from "next/link";
import Login from "./Login";
import { usePrivy } from "@privy-io/react-auth";
import LatestChecks from "./LatestChecks";
import { Suspense } from "react";

export default function Home() {
  // const checks = getData()
  const {ready, authenticated} = usePrivy()
  return (
    <>
        <h1 className="text-9xl">OCVC*</h1>
        <span>onchain vibe check*</span>
        {ready && authenticated ? (
          <Link className="text-5xl border hover:opacity-80 p-4" href={'generate'}>Start!</Link>
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
