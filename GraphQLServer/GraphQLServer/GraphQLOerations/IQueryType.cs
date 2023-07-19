using DataAccessLayer.Data.Entity;

namespace GraphQLServer.GraphQLOerations
{
    public interface IQueryType
    {
        Task<List<Student>> GetAllStudentsAsync();
        Task<Student> GetStudentByRollNo(int rollNo);
    }
}
