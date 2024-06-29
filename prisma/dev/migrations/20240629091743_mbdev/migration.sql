-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Polytechnic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Diploma" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "polytechnicId" TEXT NOT NULL,
    CONSTRAINT "Diploma_polytechnicId_fkey" FOREIGN KEY ("polytechnicId") REFERENCES "Polytechnic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Major" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "totalCreditUnit" INTEGER NOT NULL,
    "facultyId" INTEGER NOT NULL,
    CONSTRAINT "Major_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cohort" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "majorId" INTEGER NOT NULL,

    PRIMARY KEY ("id", "majorId"),
    CONSTRAINT "Cohort_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Course" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "credit" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "APC" (
    "diplomaId" TEXT NOT NULL,
    "majorId" INTEGER NOT NULL,
    "courseCode" TEXT NOT NULL,

    PRIMARY KEY ("diplomaId", "majorId", "courseCode"),
    CONSTRAINT "APC_diplomaId_fkey" FOREIGN KEY ("diplomaId") REFERENCES "Diploma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "APC_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "APC_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Course" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CourseType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TypeMapping" (
    "courseCode" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,

    PRIMARY KEY ("courseCode", "typeId"),
    CONSTRAINT "TypeMapping_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Course" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TypeMapping_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "CourseType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Curriculum" (
    "cohortId" INTEGER NOT NULL,
    "majorId" INTEGER NOT NULL,
    "courseCode" TEXT NOT NULL,
    "wildcard" BOOLEAN NOT NULL,
    "typeId" INTEGER NOT NULL,

    PRIMARY KEY ("majorId", "cohortId", "courseCode"),
    CONSTRAINT "Curriculum_cohortId_majorId_fkey" FOREIGN KEY ("cohortId", "majorId") REFERENCES "Cohort" ("id", "majorId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Curriculum_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Curriculum_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Course" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Curriculum_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "CourseType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_name_key" ON "Faculty"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_key" ON "Course"("code");
