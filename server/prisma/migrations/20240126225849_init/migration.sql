/*
  Warnings:

  - You are about to drop the `AnimeOnCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavoriteCollectionsOnUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `collections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnimeOnCollection" DROP CONSTRAINT "AnimeOnCollection_animeId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeOnCollection" DROP CONSTRAINT "AnimeOnCollection_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteCollectionsOnUsers" DROP CONSTRAINT "FavoriteCollectionsOnUsers_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteCollectionsOnUsers" DROP CONSTRAINT "FavoriteCollectionsOnUsers_userId_fkey";

-- DropForeignKey
ALTER TABLE "collections" DROP CONSTRAINT "collections_createdById_fkey";

-- DropTable
DROP TABLE "AnimeOnCollection";

-- DropTable
DROP TABLE "FavoriteCollectionsOnUsers";

-- DropTable
DROP TABLE "collections";
