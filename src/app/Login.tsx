"use client";

import { usePrivy } from "@privy-io/react-auth";

export default function Login() {
    const { authenticated, login, ready, user, logout } = usePrivy();
    if (!ready) return "Loading account data...";
    return (
        <>
            {ready && !authenticated ? (
                <div className="flex flex-col gap-2 text-lg">
                    <button
                        className="border p-4 px-8 hover:opacity-70"
                        disabled={!ready || (ready && authenticated)}
                        onClick={login}
                    >
                        login
                    </button>
                    <span className="opacity-70 text-sm">
                        login to generate your ocvc*
                    </span>
                </div>
            ) : null}
        </>
    );
}
