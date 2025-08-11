-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_from_fkey" FOREIGN KEY ("from") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
