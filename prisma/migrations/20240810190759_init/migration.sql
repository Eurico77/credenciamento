/*
  Warnings:

  - You are about to drop the column `userId` on the `Participant` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "isMember" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Participant" ("address", "age", "createdAt", "id", "isMember", "name", "phone") SELECT "address", "age", "createdAt", "id", "isMember", "name", "phone" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
