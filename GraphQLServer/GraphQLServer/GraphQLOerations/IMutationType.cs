using DataAccessLayer.Data.Entity;

namespace GraphQLServer.GraphQLOerations
{
    public interface IMutationType
    {
        /// <summary>
        /// Add a new student
        /// </summary>
        /// <param name="studentInput"></param>
        /// <returns></returns>
        Task<Student> AddNewStudent(CreateStudentInput studentInput);

        /// <summary>
        /// Update a student details
        /// </summary>
        /// <param name="student"></param>
        /// <returns></returns>
        Task<Student> UpdateStdent(Student student);

        /// <summary>
        /// Remove a student
        /// </summary>
        /// <param name="studentId"></param>
        /// <returns></returns>
        Task<string> RemoveStudent(Guid studentId);

        /// <summary>
        /// Register a new user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task<string> RegisterNewUser(User user);

        /// <summary>
        /// User login
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        Task<string> UserLogin(string username, string password);
    }
}
