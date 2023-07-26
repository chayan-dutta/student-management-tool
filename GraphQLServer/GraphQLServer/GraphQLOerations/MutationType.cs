using DataAccessLayer.CRUDOperations;
using DataAccessLayer.Data.Entity;
using GraphQLServer.TokenService;
using HotChocolate.Authorization;
using System.Data;
using System.Security.Authentication;

namespace GraphQLServer.GraphQLOerations
{
    public class MutationType : IMutationType
    {
        private readonly CRUDOperations _crudOperation;
        private readonly RegisterAndLoginOperation _registerAndLoginOperation;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly JwtTokenService _jwtTokenService;

        public MutationType(CRUDOperations crudOperations, 
            RegisterAndLoginOperation rAndLOp, 
            IHttpContextAccessor cta,
            JwtTokenService jwtTokenService) 
        { 
            _crudOperation = crudOperations;
            _registerAndLoginOperation = rAndLOp;
            _contextAccessor = cta;
            _jwtTokenService = jwtTokenService;
        }

        [Authorize(Roles = new[] { "Teacher", "Admin" })]
        public async Task<Student> AddNewStudent(CreateStudentInput studentInput)
        {
            var context = _contextAccessor.HttpContext;
            var authorizationHeader = context?.Request.Headers["Authorization"].ToString();
            if (!string.IsNullOrWhiteSpace(authorizationHeader) && authorizationHeader.StartsWith("Bearer "))
            {
                var token = authorizationHeader.Substring("Bearer ".Length);
                var userRole = _jwtTokenService.GetRoleFromToken(token);
                if(_jwtTokenService.IsTokenValid(token))
                {
                    Task<Student> student = _crudOperation.AddNewStudent(studentInput);
                    return await student;
                }
                else
                {
                    throw new AuthenticationException("Invalid JWT token.");
                }
            }
            throw new AuthenticationException("Invalid JWT token.");
        }

        [Authorize(Roles = new[] { "Teacher", "Admin" })]
        public async Task<Student> UpdateStdent(Student updatedStudent)
        {
            var context = _contextAccessor.HttpContext;
            var authorizationHeader = context?.Request.Headers["Authorization"].ToString();
            if (!string.IsNullOrWhiteSpace(authorizationHeader) && authorizationHeader.StartsWith("Bearer "))
            {
                var token = authorizationHeader.Substring("Bearer ".Length);
                var userRole = _jwtTokenService.GetRoleFromToken(token);
                Task<Student> student = _crudOperation.UpdateStudent(updatedStudent);
                return await student;
            }
            throw new AuthenticationException("Invalid JWT token.");
        }

        [Authorize(Roles = new[] { "Teacher", "Admin" })]
        public async Task<string> RemoveStudent(Guid studentId)
        {
            var context = _contextAccessor.HttpContext;
            var authorizationHeader = context.Request.Headers["Authorization"].ToString();
            if (!string.IsNullOrWhiteSpace(authorizationHeader) && authorizationHeader.StartsWith("Bearer "))
            {
                var token = authorizationHeader.Substring("Bearer ".Length);
                var userRole = _jwtTokenService.GetRoleFromToken(token);
                Task<string> message = _crudOperation.RemoveStudent(studentId);
                return await message;
            }
            throw new AuthenticationException("Invalid JWT token.");
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
