using DataAccessLayer.Data.DatabaseContext;
using DataAccessLayer.Data.Entity;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace DataAccessLayer.CRUDOperations
{
    public class CRUDOperations
    {
        private readonly StudentDbContext _studentDbContext;

        public CRUDOperations()
        {
            _studentDbContext = EFConfigurator.CreateDbContext();
        }

        public async Task<List<Student>> AllStudents()
        {
            using (var _dbContext = EFConfigurator.CreateDbContext())
            {
                var student = await _dbContext.student_details.ToListAsync();
                return student;
            }
            
        }

        public async Task<Student> GetStudentByRollNo(int rollNo)
        {
            Student? student = await _studentDbContext.student_details.FindAsync(rollNo);
            if (student == null)
            {
                throw new Exception("Student Not Found");
            }
            return student;
        }

        public async Task<Student> AddNewStudent(CreateStudentInput studentInput)
        {
            string dateString = studentInput.DateOfBirth; // The date string in yyyy-MM-dd format
                       // Using DateTime.ParseExact method (if you have a specific format)
            DateTime dateOfBirth = DateTime.ParseExact(dateString, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            DateTime utcDateOfBirth = dateOfBirth.ToUniversalTime();
            Student student = new Student
            {
                Id = Guid.NewGuid(),
                RollNo = studentInput.RollNo,
                Name = studentInput.Name,
                DateOfBirth = utcDateOfBirth.Date,
                Gender = studentInput.Gender,
                Address = studentInput.Address,
                Course = studentInput.Course,
                Grade = studentInput.Grade,
            };
            try
            {
                _studentDbContext.student_details.Add(student);
                await _studentDbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return student;
        }

        public async Task<Student> UpdateStudent(Student updatedStudent)
        {
            try
            {
                Student? student = await _studentDbContext.student_details.FindAsync(updatedStudent.Id);
                if (student == null)
                {
                    throw new Exception("Student Not Found");
                }
                student.RollNo = updatedStudent.RollNo;
                student.Name = updatedStudent.Name;
                student.Course = updatedStudent.Course;
                student.DateOfBirth = updatedStudent.DateOfBirth;
                student.Gender = updatedStudent.Gender;
                student.Address = updatedStudent.Address;
                student.Grade = updatedStudent.Grade;
                // studentDbContext.student_details.Update(updatedStudent);
                await _studentDbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
            return updatedStudent;
        }

        public async Task<string> RemoveStudent(Guid studentId)
        {
            Student? student = await _studentDbContext.student_details.FindAsync(studentId);
            if (student == null)
            {
                throw new Exception("Student Not Found");
            }
            _studentDbContext.student_details.Remove(student);
            await _studentDbContext.SaveChangesAsync();
            return "Student Details Successfully Deleted From Database";
        }
    }
}
