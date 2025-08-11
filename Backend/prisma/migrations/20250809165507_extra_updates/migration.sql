/*
  Warnings:

  - Added the required column `Time` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Message" ADD COLUMN     "Time" TEXT NOT NULL;
