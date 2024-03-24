"use client"
import { useContext } from "react"
import { GlobalContext } from "../GlobalContext"
import { generateVibeChceck } from "@/prisma/generate"

export default function Generate() {
    const context = useContext(GlobalContext)
    const {identity,status,taste,vanity,} = context
    const generate = async () => {
        await generateVibeChceck({
            identity,status,taste,vanity,
        })
    }
    return (
        <div>
            <button onClick={generate}>Generate!</button>
        </div>
    )
}