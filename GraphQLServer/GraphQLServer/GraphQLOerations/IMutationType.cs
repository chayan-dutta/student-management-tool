using DataAccessLayer.Data.Entity;

namespace GraphQLServer.GraphQLOerations
{
    public interface IMutationType
    {
        Task<Student> AddNewStudent(CreateStudentInput studentInput);
        Task<Student> UpdateStdent(Student student);
        Task<string> RemoveStudent(Guid studentId);
        Task<bool> RegisterNewUser(User user);
        Task<string> UserLogin(string username, string password);
    }
}
