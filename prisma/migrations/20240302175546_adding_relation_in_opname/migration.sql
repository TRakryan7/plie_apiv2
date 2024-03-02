/*
  Warnings:

  - Added the required column `opnameHeaderId` to the `opnameDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `opnamedetail` ADD COLUMN `opnameHeaderId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `opnameDetail` ADD CONSTRAINT `opnameDetail_opnameHeaderId_fkey` FOREIGN KEY (`opnameHeaderId`) REFERENCES `opnameHeader`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
