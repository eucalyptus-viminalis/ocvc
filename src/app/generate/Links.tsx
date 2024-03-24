"use client"
import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";

export default function Links() {
    const context = useContext(GlobalContext);
    const { identity, status, taste, vanity } = context;
    return (
        <>
            <Link href={"status"} className={status ? "text-green-600" : ""}>
                Status
            </Link>
            <Link
                href={"identity"}
                className={identity ? "text-green-600" : ""}
            >
                identity
            </Link>
            <Link href={"taste"} className={taste ? "text-green-600" : ""}>
                taste
            </Link>
            <Link href={"vanity"} className={vanity ? "text-green-600" : ""}>
                vanity
            </Link>
        </>
    );
}
