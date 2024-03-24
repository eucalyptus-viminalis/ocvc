"use server"
import { prisma } from "./client";

export async function deleteVibeCheck(fid: number) {
    // ... you will write your Prisma Client queries here
    console.log("start");

    const [a,b,c,d,e] = await Promise.all([
        prisma.identityModel.deleteMany({
            where: {
                fid: fid,
            },
        }),
        prisma.tokenTransferModel.deleteMany({
            where: {
                fid: fid
            }
        }),
        prisma.vanityModel.deleteMany({
            where: {
                fid: fid
            }
        }),
        prisma.statusModel.deleteMany({
            where: {
                fid: fid
            }
        }),
        prisma.tasteModel.deleteMany({
            where: {
                fid: fid
            },
        }),
    ]);
    console.log([a,b,c,d,e])
    const totalRowsDeleted = [a,b,c,d,e].reduce((acc,v)=>{
        return acc + v.count
    },0)
    return totalRowsDeleted
}

// main()
//     .then(async () => {
//         await prisma.$disconnect();
//     })
//     .catch(async (e) => {
//         console.error(e);
//         await prisma.$disconnect();
//         process.exit(1);
//     });
