using DataAccessLayer.CRUDOperations;
using DataAccessLayer.Data.Entity;

namespace GraphQLServer.GraphQLOerations
{
    public class MutationType : IMutationType
    {
        private readonly CRUDOperations _crudOperation;
        public MutationType(CRUDOperations crudOperations) 
        { 
            _crudOperation = crudOperations;
        }

        public async Task<Student> AddNewStudent(CreateStudentInput studentInput)
        {
            Task<Student> student = _crudOperation.AddNewStudent(studentInput);
            return await student;
        }

        public async Task<Student> UpdateStdent(Student updatedStudent)
        {
            Task<Student> student = _crudOperation.UpdateStudent(updatedStudent);
            return await student;
        }

        public async Task<string> RemoveStudent(Guid studentId)
        {
            Task<string> message = _crudOperation.RemoveStudent(studentId);
            return await message;
        }
    }
}
