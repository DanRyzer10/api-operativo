-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_businessId_fkey`;

-- DropIndex
DROP INDEX `User_businessId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` MODIFY `businessId` VARCHAR(36) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
