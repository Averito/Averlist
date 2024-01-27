/*
  Warnings:

  - You are about to drop the column `discordId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `vkId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `yandexId` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_discordId_key";

-- DropIndex
DROP INDEX "users_vkId_key";

-- DropIndex
DROP INDEX "users_yandexId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "discordId",
DROP COLUMN "vkId",
DROP COLUMN "yandexId";
