-- Create the database
CREATE DATABASE StudentManagementDB;

-- Connect to the newly created database
\c StudentManagementDB;

-- Create the student_details table
CREATE TABLE IF NOT EXISTS student_details (
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

-- Create the user_details table
CREATE TABLE IF NOT EXISTS user_details (
    "Id" UUID NOT NULL,
    "Username" CHAR(20) NOT NULL,
    "Password" TEXT NOT NULL,
    "Email" VARCHAR(50) NOT NULL,
    "Name" VARCHAR(50) NOT NULL,
    "Role" VARCHAR(50) NOT NULL,
    CONSTRAINT "PK_user_details" PRIMARY KEY ("Username")
);

-- Insert to student details

INSERT INTO student_details ("Id", "RollNo", "Name", "DateOfBirth", "Gender", "Address", "Course", "Grade")
VALUES
    ('e943d8c0-2e44-11ec-8d3d-0242ac130003', 101, 'Chayan', '2000-01-15', 'Male', 'Kolkata', 'B. Tech', 'A'),
    ('e943d8c0-2e44-11ec-8d3d-0242ac130004', 102, 'Sourav', '2000-05-20', 'Male', 'Mumbai', 'B. Tech', 'B'),
    ('e943d8c0-2e44-11ec-8d3d-0242ac130005', 103, 'Raja', '2001-03-10', 'Male', 'Bangalore', 'B. Tech', 'C'),
    ('e943d8c0-2e44-11ec-8d3d-0242ac130006', 104, 'Subhas', '2000-09-05', 'Male', 'Chennai', 'M. Tech', 'B'),
    ('e943d8c0-2e44-11ec-8d3d-0242ac130007', 105, 'Sanjukta', '2000-07-25', 'Female', 'Pune', 'MCA', 'A');
