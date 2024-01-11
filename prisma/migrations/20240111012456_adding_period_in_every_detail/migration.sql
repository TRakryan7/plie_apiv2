/*
  Warnings:

  - Added the required column `period` to the `movingDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `opnameDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movingdetail` ADD COLUMN `period` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `opnamedetail` ADD COLUMN `period` INTEGER NOT NULL;
