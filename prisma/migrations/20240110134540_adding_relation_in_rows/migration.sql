/*
  Warnings:

  - Added the required column `shelvesId` to the `Rows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warehouseId` to the `Rows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rows` ADD COLUMN `shelvesId` VARCHAR(191) NOT NULL,
    ADD COLUMN `warehouseId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Rows` ADD CONSTRAINT `Rows_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rows` ADD CONSTRAINT `Rows_shelvesId_fkey` FOREIGN KEY (`shelvesId`) REFERENCES `Shelves`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
