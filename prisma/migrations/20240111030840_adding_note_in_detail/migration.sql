/*
  Warnings:

  - Added the required column `note` to the `movingDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `opnameDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movingdetail` ADD COLUMN `note` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `opnamedetail` ADD COLUMN `note` VARCHAR(191) NOT NULL;
