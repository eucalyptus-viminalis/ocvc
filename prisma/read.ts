import { prisma } from "./client";

async function create() {
    // ... you will write your Prisma Client queries here
    console.log("reading...");

    const allUsers = await prisma.identityModel.findMany();
    if (!allUsers || allUsers.length == 0) {
        console.log("found none");
    }
    console.log(allUsers);
    const status = await prisma.statusModel.findMany();
    if (!status || status.length == 0) {
        console.log("found none");
    }
    console.log(status);
    const tokens = await prisma.tokenTransferModel.findMany();
    if (!tokens || tokens.length == 0) {
        console.log("found none");
    }
    console.log(tokens);
    const tastes = await prisma.tasteModel.findMany()
    if (!tastes|| tastes.length == 0) {
        console.log("found none");
    }
    const vanities = await prisma.vanityModel.findMany()
    if (!vanities|| vanities.length == 0) {
        console.log("found none");
    }
    console.log(vanities);
}

create()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
