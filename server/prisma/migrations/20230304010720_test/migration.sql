/*
  Warnings:

  - You are about to drop the column `collectionId` on the `anime` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "anime" DROP CONSTRAINT "anime_collectionId_fkey";

-- AlterTable
ALTER TABLE "anime" DROP COLUMN "collectionId";

-- CreateTable
CREATE TABLE "AnimeOnCollection" (
    "animeId" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "AnimeOnCollection_pkey" PRIMARY KEY ("animeId","collectionId")
);

-- AddForeignKey
ALTER TABLE "AnimeOnCollection" ADD CONSTRAINT "AnimeOnCollection_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeOnCollection" ADD CONSTRAINT "AnimeOnCollection_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
