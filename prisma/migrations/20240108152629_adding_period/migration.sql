/*
  Warnings:

  - Added the required column `periodCode` to the `Period` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `period` ADD COLUMN `periodCode` VARCHAR(191) NOT NULL;
