/*
  Warnings:

  - You are about to drop the column `customerLevel` on the `trainings` table. All the data in the column will be lost.
  - Added the required column `trainingLevel` to the `trainings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trainings" DROP COLUMN "customerLevel",
ADD COLUMN     "trainingLevel" TEXT NOT NULL;
