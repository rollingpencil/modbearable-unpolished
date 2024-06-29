/*
  Warnings:

  - You are about to drop the column `exempt` on the `Diploma` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Diploma" (
    "diplomaID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "polyID" INTEGER NOT NULL,
    CONSTRAINT "Diploma_polyID_fkey" FOREIGN KEY ("polyID") REFERENCES "Polytechnic" ("polyID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Diploma" ("diplomaID", "name", "polyID") SELECT "diplomaID", "name", "polyID" FROM "Diploma";
DROP TABLE "Diploma";
ALTER TABLE "new_Diploma" RENAME TO "Diploma";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
