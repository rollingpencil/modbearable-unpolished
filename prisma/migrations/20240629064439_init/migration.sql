-- CreateTable
CREATE TABLE "Polytechnic" (
    "polyID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Diploma" (
    "diplomaID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "polyID" INTEGER NOT NULL,
    "exempt" BOOLEAN NOT NULL,
    CONSTRAINT "Diploma_polyID_fkey" FOREIGN KEY ("polyID") REFERENCES "Polytechnic" ("polyID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "APC" (
    "diplomaID" INTEGER NOT NULL,
    "majorID" INTEGER NOT NULL,
    "courseCode" TEXT NOT NULL,
    CONSTRAINT "APC_diplomaID_fkey" FOREIGN KEY ("diplomaID") REFERENCES "Diploma" ("diplomaID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "APC_majorID_fkey" FOREIGN KEY ("majorID") REFERENCES "Major" ("majorID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "APC_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Course" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UFaculty" (
    "facID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Major" (
    "majorID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "facID" INTEGER NOT NULL,
    "totalCU" INTEGER NOT NULL,
    CONSTRAINT "Major_facID_fkey" FOREIGN KEY ("facID") REFERENCES "UFaculty" ("facID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cohort" (
    "cohortID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "majorID" INTEGER NOT NULL,
    CONSTRAINT "Cohort_majorID_fkey" FOREIGN KEY ("majorID") REFERENCES "Major" ("majorID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Curriculum" (
    "majorID" INTEGER NOT NULL,
    "cohortID" INTEGER NOT NULL,
    "courseCode" TEXT NOT NULL,
    "wildcard" BOOLEAN NOT NULL,
    CONSTRAINT "Curriculum_majorID_fkey" FOREIGN KEY ("majorID") REFERENCES "Major" ("majorID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Curriculum_cohortID_fkey" FOREIGN KEY ("cohortID") REFERENCES "Cohort" ("cohortID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Curriculum_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Course" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Course" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "credit" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "CourseType" (
    "typeID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TypeMapping" (
    "courseCode" TEXT NOT NULL,
    "typeID" INTEGER NOT NULL,
    CONSTRAINT "TypeMapping_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Course" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TypeMapping_typeID_fkey" FOREIGN KEY ("typeID") REFERENCES "CourseType" ("typeID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "APC_diplomaID_key" ON "APC"("diplomaID");

-- CreateIndex
CREATE UNIQUE INDEX "Curriculum_majorID_key" ON "Curriculum"("majorID");

-- CreateIndex
CREATE UNIQUE INDEX "TypeMapping_courseCode_key" ON "TypeMapping"("courseCode");
