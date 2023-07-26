using DataAccessLayer.CRUDOperations;
using DataAccessLayer.Data.Entity;
using GraphQLServer.TokenService;
using HotChocolate.Authorization;
using System.Security.Authentication;

namespace GraphQLServer.GraphQLOerations
{
    public class QueryType : IQueryType
    {
        private readonly CRUDOperations _crudperations;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly JwtTokenService _jwtTokenService;

        public QueryType(CRUDOperations crud, IHttpContextAccessor cta, JwtTokenService jwtTokenService) 
        { 
            _crudperations = crud;
            _contextAccessor = cta;
            _jwtTokenService = jwtTokenService;
        }

        [Authorize(Roles = new[] { "Student", "Teacher", "Admin" })]
        public async Task<List<Student>> GetAllStudentsAsync()
        {
            var context = _contextAccessor.HttpContext;
            var authorizationHeader = context?.Request.Headers["Authorization"].ToString();
            if (!string.IsNullOrWhiteSpace(authorizationHeader) && authorizationHeader.StartsWith("Bearer "))
            {
                var token = authorizationHeader.Substring("Bearer ".Length);
                var userRole = _jwtTokenService.GetRoleFromToken(token);
                if(_jwtTokenService.IsTokenValid(token))
                {
                    return await _crudperations.AllStudents();
                }
                else
                {
                    throw new AuthenticationException("JWT Token Expired");
                }
            }
            throw new AuthenticationException("Invalid JWT token.");
        }

        public async Task<Student> GetStudentByRollNo(int rollNo)
        {
            Task<Student> student = _crudperations.GetStudentByRollNo(rollNo);
            return await student;
        }
    }
}
