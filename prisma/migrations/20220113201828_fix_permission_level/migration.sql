/*
  Warnings:

  - You are about to drop the column `permissionsLevel` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "permissionsLevel",
ADD COLUMN     "permissionLevel" INTEGER NOT NULL DEFAULT 0;
