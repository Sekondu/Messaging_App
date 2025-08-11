/*
  Warnings:

  - The `Time` column on the `Message` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Message" DROP COLUMN "Time",
ADD COLUMN     "Time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
