-- CreateTable
CREATE TABLE "IdentityModel" (
    "id" SERIAL NOT NULL,
    "fid" INTEGER NOT NULL,
    "eth_addresses" TEXT[],

    CONSTRAINT "IdentityModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusModel" (
    "id" SERIAL NOT NULL,
    "fid" INTEGER NOT NULL,
    "firstTxOnBase_timestamp" TEXT,
    "firstTxOnBase_txHash" TEXT,
    "firstTxOnEth_timestamp" TEXT,
    "firstTxOnEth_txHash" TEXT,
    "fcFollowerCount" INTEGER,
    "fcEngagementScore_rank" INTEGER,
    "fcEngagementScore_score" DOUBLE PRECISION,
    "fcEngagementScore_percentile" INTEGER,
    "fcFollowingScore_rank" INTEGER,
    "fcFollowingScore_score" DOUBLE PRECISION,
    "fcFollowingScore_percentile" INTEGER,
    "totalSuperchainBalance" TEXT,

    CONSTRAINT "StatusModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TasteModel" (
    "id" SERIAL NOT NULL,
    "fid" INTEGER NOT NULL,

    CONSTRAINT "TasteModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenTransferModel" (
    "id" SERIAL NOT NULL,
    "fid" INTEGER NOT NULL,
    "tasteDataId" INTEGER,
    "tokenAddress" TEXT NOT NULL,
    "tokenNftContentValueImageMedium" TEXT,
    "tokenNftTokenId" TEXT NOT NULL,
    "tokenType" TEXT NOT NULL,
    "blockchain" TEXT NOT NULL,
    "tokenName" TEXT NOT NULL,
    "tasteModelId" INTEGER,

    CONSTRAINT "TokenTransferModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VanityModel" (
    "id" SERIAL NOT NULL,
    "fid" INTEGER NOT NULL,
    "pfpUrls" TEXT[],
    "hasOpepen" BOOLEAN,
    "ensNames" TEXT[],

    CONSTRAINT "VanityModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IdentityModel_fid_key" ON "IdentityModel"("fid");

-- CreateIndex
CREATE UNIQUE INDEX "StatusModel_fid_key" ON "StatusModel"("fid");

-- CreateIndex
CREATE UNIQUE INDEX "TasteModel_fid_key" ON "TasteModel"("fid");

-- CreateIndex
CREATE UNIQUE INDEX "TokenTransferModel_fid_key" ON "TokenTransferModel"("fid");

-- CreateIndex
CREATE UNIQUE INDEX "VanityModel_fid_key" ON "VanityModel"("fid");

-- AddForeignKey
ALTER TABLE "TokenTransferModel" ADD CONSTRAINT "TokenTransferModel_tasteModelId_fkey" FOREIGN KEY ("tasteModelId") REFERENCES "TasteModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
