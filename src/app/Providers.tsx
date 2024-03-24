"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { appConfig } from "./appConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalContextProvider from "./GlobalContextProvider";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <PrivyProvider
            appId={appConfig.privyAppID}
            config={{
                // Customize Privy's appearance in your app
                appearance: {
                    theme: "dark",
                    accentColor: "#676FFF",
                    logo: appConfig.host + "/placeholder.svg",
                    // logo: 'https://localhost:3000' + "/placeholder.svg",
                },
                // Create embedded wallets for users who don't have a wallet
                embeddedWallets: {
                    createOnLogin: "users-without-wallets",
                },
            }}
        >
            <GlobalContextProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </GlobalContextProvider>
        </PrivyProvider>
    );
}
