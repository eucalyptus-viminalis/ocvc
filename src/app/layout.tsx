import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import Login from "./Login";
import CornerLogin from "./CornerLogin";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ocvc*",
    description: "ur (sufficiently) onchain vibe check",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <main className="flex min-h-screen flex-col items-center p-24 gap-4 text-xl">
                        <div className="h-20 flex w-full flex-row justify-between">
                            <Link className="border w-fit border-red-600 p-2 hover:opacity-70" href={'/'}>OCVC*</Link>
                            <CornerLogin />
                        </div>
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
