using DataAccessLayer.Data.Entity;

namespace GraphQLServer.GraphQLOerations
{
    public interface IMutationType
    {
        Task<Student> AddNewStudent(CreateStudentInput studentInput);
        Task<Student> UpdateStdent(Student student);
        Task<string> RemoveStudent(Guid studentId);
    }
}
