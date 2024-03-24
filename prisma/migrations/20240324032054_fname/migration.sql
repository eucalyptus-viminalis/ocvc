/*
  Warnings:

  - A unique constraint covering the columns `[fname]` on the table `IdentityModel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fname` to the `IdentityModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IdentityModel" ADD COLUMN     "fname" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "IdentityModel_fname_key" ON "IdentityModel"("fname");
