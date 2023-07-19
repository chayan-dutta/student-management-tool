using DataAccessLayer.CRUDOperations;
using DataAccessLayer.Data.Entity;

namespace GraphQLServer.GraphQLOerations
{
    public class QueryType : IQueryType
    {
        private readonly CRUDOperations _crudperations;
        public QueryType(CRUDOperations crud) 
        { 
            _crudperations = crud;
        }
        public async Task<List<Student>> GetAllStudentsAsync()
        {
            return await _crudperations.AllStudents();
        }

        public async Task<Student> GetStudentByRollNo(int rollNo)
        {
            Task<Student> student = _crudperations.GetStudentByRollNo(rollNo);
            return await student;
        }
    }
}
