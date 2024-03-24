"use client"

import { usePrivy } from "@privy-io/react-auth"

export default function CornerLogin() {
    const {authenticated, login, ready, user, logout} = usePrivy()
    if (!ready) return "Loading account..."
    return (
        <>
            {authenticated ? (
                <div className="flex flex-col justify-between">
                    <span>{user?.farcaster?.username} ✅</span>
            <button 
            className="border p-2 hover:opacity-70"
            disabled={!ready || (ready && !authenticated)} 
            onClick={logout}>logout</button>
                </div>
            ) : (
            <button 
            className="border max-h-16 px-8 hover:opacity-70"
            disabled={!ready || (ready && authenticated)} 
            onClick={login}>login</button>
            )}
        </>
    )
}