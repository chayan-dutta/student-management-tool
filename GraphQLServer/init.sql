CREATE TABLE IF NOT EXISTS Student_Details (
    "Id" UUID NOT NULL,
    "RollNo" INTEGER NOT NULL,
    "Name" VARCHAR(50) NOT NULL,
    "DateOfBirth" TIMESTAMP NOT NULL,
    "Gender" VARCHAR(50) NOT NULL,
    "Address" VARCHAR(50) NOT NULL,
    "Course" VARCHAR(50) NOT NULL,
    "Grade" VARCHAR(50) NOT NULL,
    PRIMARY KEY ("Id")
);

-- Create the User_Details table
CREATE TABLE IF NOT EXISTS User_Details (
    "Id" UUID NOT NULL,
    "Username" CHAR(10) NOT NULL,
    "Password" TEXT NOT NULL,
    "Email" VARCHAR(50) NOT NULL,
    "Name" VARCHAR(50) NOT NULL,
    "Role" VARCHAR(50) NOT NULL,
    CONSTRAINT "PK_User_Details" PRIMARY KEY ("Username")
);