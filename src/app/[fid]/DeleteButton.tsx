"use client";

import { deleteVibeCheck } from "@/prisma/delete";
import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { useEffect, useState } from "react";

type DeleteButtonProps = {
    fid: number
}

export default function DeleteButton(props: DeleteButtonProps) {
    const {fid} = props
    const [fidLoggedIn, setFidLoggedIn] = useState<number|null>()
    const [deleting, setDeleting] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [deleteingFailed, setDeletingFailed] = useState<boolean>();
    const { ready, user, authenticated } = usePrivy();

    useEffect(() => {
        if (ready && authenticated) {
            setFidLoggedIn(user?.farcaster?.fid);
        }
    }, [user, ready, authenticated]);

    const deleteOCVC = async () => {
        try {
            setDeleting(true);
            const data = await deleteVibeCheck(fid);
            if (data > 0) {
                setDeleted(true);
            }
        } catch {
            setDeletingFailed(true);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            {ready && authenticated && fid === user?.farcaster?.fid ? (
                <div>
                    <button
                        onClick={deleteOCVC}
                        className="border p-2 px-8 hover:opacity-70 border-red-700 text-red-600"
                    >
                        Delete your OCVC*
                    </button>
                    {deleting ? (
                        <div className="gap-6 items-center top-0 left-0 fixed z-50 w-full h-full bg-black opacity-90 border flex flex-col text-center justify-center align-middle">
                            {deleted ? (
                                <div className="flex flex-col">
                                    <span>
                                        your vibe check has been successfully
                                        deleted.
                                    </span>
                                    <Link
                                        className="border p-2 px-8 text-lg hover:opacity-70"
                                        href={"/generate"}
                                    >
                                        Generate new OCVC
                                    </Link>
                                    <button
                                        className="border p-2 px-8 hover:opacity-70"
                                        onClick={() => setDeleted(false)}
                                    >
                                        OK
                                    </button>
                                </div>
                            ) : (
                                <span>Deleting... </span>
                            )}
                        </div>
                    ) : null}
                    {!deleting && deleted ? (
                        <div className="gap-6 items-center top-0 left-0 fixed z-50 w-full h-full bg-black opacity-90 border flex flex-col text-center justify-center align-middle">
                            <span>
                                your vibe check has been successfully deleted.
                            </span>
                            <Link
                                className="border p-2 px-8 text-lg hover:opacity-70"
                                href={"/generate"}
                            >
                                Generate new OCVC
                            </Link>
                            <button
                                className="border p-2 px-8 hover:opacity-70"
                                onClick={() => setDeleted(false)}
                            >
                                OK
                            </button>
                        </div>
                    ) : null}
                    {deleteingFailed ? (
                        <div className="gap-6 top-0 left-0 items-center fixed z-50 w-full h-full bg-black opacity-90 border flex flex-col text-center justify-center align-middle">
                            <span>Failed to delete your vibe check.</span>
                            <button
                                className="border p-2 px-8 hover:opacity-70"
                                onClick={() => setDeletingFailed(false)}
                            >
                                OK
                            </button>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </>
    );
}
