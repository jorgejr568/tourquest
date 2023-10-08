/*
  Warnings:

  - Added the required column `shortDescription` to the `Journey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Journey" ADD COLUMN     "shortDescription" TEXT NOT NULL;
