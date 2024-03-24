"use server"
import { prisma } from "./client";
import { IdentityData } from "../src/app/generate/identity/data";
import { StatusData } from "../src/app/generate/status/data";
import { TasteData } from "../src/app/generate/taste/data";
import { VanityData } from "../src/app/generate/vanity/data";

type generateVibeCheckProps = {
    identity: IdentityData;
    status: StatusData;
    taste: TasteData;
    vanity: VanityData;
};

export async function generateVibeCheck(props: generateVibeCheckProps) {
    console.log('generate start')
    const { identity, status, taste, vanity } = props;
    const [a,b,c,d] = await Promise.all([
        prisma.identityModel.create({
            data: {
                fid: identity.fid!,
                fname: identity.fname!,
                eth_addresses: identity.eth_addresses
            },
        }),
        prisma.statusModel.create({
            data: {
                fid: identity.fid!,
                fcEngagementScore_percentile:
                    status.fcEngagementScore?.percentile,
                fcEngagementScore_rank: status.fcEngagementScore?.rank,
                fcEngagementScore_score: status.fcEngagementScore?.score,
                fcFollowerCount: status.fcFollowerCount,
                fcFollowingScore_percentile:
                    status.fcFollowingScore?.percentile,
                fcFollowingScore_rank: status.fcFollowingScore?.rank,
                fcFollowingScore_score: status.fcFollowingScore?.score,
                firstTxOnBase_timestamp: status.firstTxOnBase?.timestamp,
                firstTxOnBase_txHash: status.firstTxOnBase?.txHash,
                firstTxOnEth_timestamp: status.firstTxOnEth?.timestamp,
                firstTxOnEth_txHash: status.firstTxOnEth?.txHash,
                totalSuperchainBalance: status.totalSuperchainBalance,
            },
        }),
        prisma.vanityModel.create({
            data: {
                fid: identity.fid!,
                ensNames: vanity.ensNames,
                hasOpepen: vanity.hasOpepen,
                pfpUrls: vanity.pfpUrls,
            },
        }),
        prisma.tasteModel.create({
            data: {
                fid: identity.fid!,
                tokenTransfers: {
                    createMany: {
                        data: taste.latestTokenTransfers!.map((token) => {
                            return {
                                blockchain: token.blockchain,
                                fid: identity.fid!,
                                tokenAddress: token.tokenAddress,
                                tokenName: token.token.name,
                                tokenNftTokenId: token.tokenNft.tokenId,
                                tokenType: token.tokenType,
                                tokenNftContentValueImageMedium:
                                    token.tokenNft.contentValue.image.medium,
                            };
                        }),
                    },
                },
            },
            include: {
                tokenTransfers: true,
            },
        }),
    ]);
    const data = {
        identity: a,
        status: b,
        vanity: c,
        taste: d,
    }
    return data
}

// generateVibeChceck()
//     .then(async () => {
//         await prisma.$disconnect();
//     })
//     .catch(async (e) => {
//         console.error(e);
//         await prisma.$disconnect();
//         process.exit(1);
//     });
