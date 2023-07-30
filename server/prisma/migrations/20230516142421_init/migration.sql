/*
  Warnings:

  - You are about to drop the `News` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFriendList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invitations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserFriendList" DROP CONSTRAINT "UserFriendList_invitedUserId_fkey";

-- DropForeignKey
ALTER TABLE "UserFriendList" DROP CONSTRAINT "UserFriendList_senderUserId_fkey";

-- DropForeignKey
ALTER TABLE "invitations" DROP CONSTRAINT "invitations_invitedUserId_fkey";

-- DropForeignKey
ALTER TABLE "invitations" DROP CONSTRAINT "invitations_senderUserId_fkey";

-- DropTable
DROP TABLE "News";

-- DropTable
DROP TABLE "UserFriendList";

-- DropTable
DROP TABLE "invitations";
