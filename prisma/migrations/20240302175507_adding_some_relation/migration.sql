/*
  Warnings:

  - Made the column `movingHeaderId` on table `movingdetail` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `movingdetail` MODIFY `movingHeaderId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `movingDetail` ADD CONSTRAINT `movingDetail_movingHeaderId_fkey` FOREIGN KEY (`movingHeaderId`) REFERENCES `movingHeader`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
