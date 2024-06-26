import type { Metadata } from "next";
import Links from "./Links";
import ContextHints from "./ContextHints";

export const metadata: Metadata = {
    title: "generate | ocvc*",
    description: "ur (sufficiently) onchain vibe check",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
            <div className='flex w-full flex-col'>
                <div className="flex flex-row gap-10">
                    <Links/>
                </div>
                {children}

                <div className="flex flex-col gap-2 opacity-30">
                    <span>data so far...</span>
                    <ContextHints/>
                </div>
            </div>
    );
}
