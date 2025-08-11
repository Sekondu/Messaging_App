/*
  Warnings:

  - You are about to drop the column `friendsIds` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "friendsIds";

-- CreateTable
CREATE TABLE "public"."FriendRelations" (
    "userId" INTEGER NOT NULL,
    "friendId" INTEGER NOT NULL,

    CONSTRAINT "FriendRelations_pkey" PRIMARY KEY ("userId","friendId")
);

-- CreateIndex
CREATE INDEX "FriendRelations_friendId_idx" ON "public"."FriendRelations"("friendId");

-- AddForeignKey
ALTER TABLE "public"."FriendRelations" ADD CONSTRAINT "FriendRelations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FriendRelations" ADD CONSTRAINT "FriendRelations_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
