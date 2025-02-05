/*
  Warnings:

  - You are about to drop the column `description` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Task` table. All the data in the column will be lost.
  - The `status` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "taskStatus" AS ENUM ('pending', 'completed');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "description",
DROP COLUMN "projectId",
DROP COLUMN "updatedAt",
DROP COLUMN "status",
ADD COLUMN     "status" "taskStatus" NOT NULL DEFAULT 'pending';
