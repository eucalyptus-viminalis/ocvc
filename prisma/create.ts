import { prisma } from "./client"

async function create() {
    // ... you will write your Prisma Client queries here
    console.log('start generating')

    await prisma.identityModel.create({
        data: {
            eth_addresses: ['0xlol'],
            fid: 30,
        },
    })
    const allUsers = await prisma.identityModel.findMany()
    if (!allUsers || allUsers.length == 0) {
        console.log('found none')
    }
    if(allUsers) {
        console.log('ok')
    }
    console.log(allUsers)
  }

create()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })