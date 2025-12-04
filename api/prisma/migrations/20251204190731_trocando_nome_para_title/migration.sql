/*
  Warnings:

  - You are about to drop the column `task` on the `TodoList` table. All the data in the column will be lost.
  - Added the required column `title` to the `TodoList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TodoList` DROP COLUMN `task`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
