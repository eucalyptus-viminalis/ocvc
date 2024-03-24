"use client";

import { useState, useRef } from "react";
import { StatusData } from "./generate/status/data";
import { VanityData } from "./generate/vanity/data";
import { IdentityData } from "./generate/identity/data";
import { TasteData } from "./generate/taste/data";
import { GlobalContext } from "./GlobalContext";

export default function GlobalContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [status, setStatus] = useState<StatusData>({});
    const [vanity, setVanity] = useState<VanityData>({});
    const [identity, setIdentity] = useState<IdentityData>({});
    const [taste, setTaste] = useState<TasteData>({});

    return (
        <GlobalContext.Provider
            value={{
                status,
                identity,
                setIdentity,
                setStatus,
                setTaste,
                setVanity,
                taste,
                vanity,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
