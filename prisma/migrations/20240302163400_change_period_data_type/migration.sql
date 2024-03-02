-- AlterTable
ALTER TABLE `movingdetail` MODIFY `period` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `movingheader` MODIFY `period` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `opnamedetail` MODIFY `period` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `opnameheader` MODIFY `period` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `period` MODIFY `periodCode` VARCHAR(191) NOT NULL;
