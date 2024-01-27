/*
  Warnings:

  - You are about to drop the column `activate_link` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `emailActive` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `refreshTokenHash` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[discordId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vkId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[yandexId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_activate_link_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "activate_link",
DROP COLUMN "emailActive",
DROP COLUMN "refreshTokenHash",
ADD COLUMN     "discordId" TEXT,
ADD COLUMN     "vkId" TEXT,
ADD COLUMN     "yandexId" TEXT;

-- CreateTable
CREATE TABLE "OAuthSession" (
    "id" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "OAuthSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_discordId_key" ON "users"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "users_vkId_key" ON "users"("vkId");

-- CreateIndex
CREATE UNIQUE INDEX "users_yandexId_key" ON "users"("yandexId");
