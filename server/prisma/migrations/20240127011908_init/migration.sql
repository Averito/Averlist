-- AlterTable
ALTER TABLE "OAuthSession" ALTER COLUMN "accessToken" DROP NOT NULL,
ALTER COLUMN "refreshToken" DROP NOT NULL;
