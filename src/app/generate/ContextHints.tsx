"use client"

import { useContext } from "react"
import { GlobalContext } from "../GlobalContext"

export default function ContextHints() {
    const context = useContext(GlobalContext)
    return (
        <>
            <span>{JSON.stringify(context)}</span>
        </>
    )
}