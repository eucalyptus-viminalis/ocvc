"use client"
import { useQuery } from "@tanstack/react-query";
import { getVibeCheckData } from "./[fid]/data";
import Link from "next/link";

type MainButtonsProps = {
    fid: number
}

export default function MainButtons(props: MainButtonsProps) {
    const {fid} = props
    const { isPending, error, data } = useQuery({
        queryKey: ["currentUserVibeCheckData"],
        queryFn: () => getVibeCheckData(fid),
    });
    if (isPending) return "Loading...";
    if (error) return "Error occured.";
    return (
        <>
        {data ? (
            <Link className="text-5xl border hover:opacity-80 p-4" href={'/' + fid }>My OCVC*</Link>
        ) : (
          <Link className="text-5xl border hover:opacity-80 p-4" href={'generate'}>Start!</Link>
        )}
        </>
    )
}