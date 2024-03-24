import { prisma } from "./client"


async function main() {
    // ... you will write your Prisma Client queries here
        console.log('start')

    await prisma.identityModel.deleteMany()
    await Promise.all([
      prisma.identityModel.deleteMany(),
      prisma.tokenTransferModel.deleteMany(),
      prisma.vanityModel.deleteMany(),
      prisma.statusModel.deleteMany(),
      prisma.tasteModel.deleteMany()
    ])
    const allUsers = await prisma.vanityModel.findMany()
    if (!allUsers || allUsers.length == 0) {
        console.log('found none')
    }
    if(allUsers) {
        console.log('ok')
    }
    console.log(allUsers)
  }

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })