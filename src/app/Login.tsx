"use client"

import { usePrivy } from "@privy-io/react-auth"

export default function Login() {
    const {authenticated, login, ready, user, logout} = usePrivy()
    return (
        <>
            <p>{`authenticated? ${authenticated}`}</p>
            <button 
            disabled={!ready || (ready && authenticated)} 
            onClick={login}>login</button>
            <button 
            disabled={!ready || (ready && !authenticated)} 
            onClick={logout}>logout</button>
            <p>{user ? JSON.stringify(user.farcaster, null ,2) : null}</p>
            <p>{user ? JSON.stringify(user.wallet, null ,2) : null}</p>
        </>
    )
}