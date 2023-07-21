using DataAccessLayer.CRUDOperations;
using DataAccessLayer.Data.Entity;

namespace GraphQLServer.GraphQLOerations
{
    public class MutationType : IMutationType
    {
        private readonly CRUDOperations _crudOperation;
        private readonly RegisterAndLoginOperation _registerAndLoginOperation;
        public MutationType(CRUDOperations crudOperations, RegisterAndLoginOperation rAndLOp) 
        { 
            _crudOperation = crudOperations;
            _registerAndLoginOperation = rAndLOp;
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

        public async Task<string> RegisterNewUser(User user)
        {
            Task<string> isRegistered = _registerAndLoginOperation.RegisterUser(user);
            return await isRegistered;
        }

        public async Task<string> UserLogin(string username, string password)
        {
            Task<string> loginMessage = _registerAndLoginOperation.UserLogin(username, password);
            return await loginMessage;
        }
    }
}
