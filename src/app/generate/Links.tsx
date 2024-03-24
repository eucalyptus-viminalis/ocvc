"use client"
import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import Generate from "./Generate";
import { appConfig } from "../appConfig";

export default function Links() {
    const context = useContext(GlobalContext);
    const { identity, status, taste, vanity } = context;
    return (
        <>
            <Link
                href={'/generate/identity'}
            className='border p-2 px-8 hover:opacity-70'
            >
                identity
            </Link>
            <Link 
                href={'/generate/status'}
            className='border p-2 px-8 hover:opacity-70'
            >
                status
            </Link>
            <Link 
            className='border p-2 px-8 hover:opacity-70'
            href={"/generate/vanity"}>
                vanity
            </Link>
            <Link 
            className='border p-2 px-8 hover:opacity-70'
            href={"/generate/taste"}>
                taste
            </Link>
            <Generate/>
        </>
    );
}
