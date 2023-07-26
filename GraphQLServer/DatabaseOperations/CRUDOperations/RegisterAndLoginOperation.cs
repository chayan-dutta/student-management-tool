using DataAccessLayer.Data.DatabaseContext;
using DataAccessLayer.Data.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.CRUDOperations
{
    public class RegisterAndLoginOperation
    {
        private readonly UserDbContext _userDbContext;
        public RegisterAndLoginOperation() 
        { 
            _userDbContext = EFConfigurator.CreateUserDbContext();
        }

        public async Task<string> RegisterUser(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            if (await _userDbContext.User_Details.AnyAsync(u => u.Username == user.Username)
                   || await _userDbContext.User_Details.AnyAsync(u => u.Email == user.Email))
            {
                return "User already exists"; // User already exists
            }

            string hashedPasssword = HashPassword(user.Password);

            User newUser = new()
            {
                Id = Guid.NewGuid(),
                Name = user.Name,
                Email = user.Email,
                Password = hashedPasssword,
                Role = user.Role,
                Username = user.Username
            };

            try
            {
                _userDbContext.User_Details.Add(newUser);
                await _userDbContext.SaveChangesAsync();
                var jwtToken = CreateToken(newUser);
                return jwtToken; // user created
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return e.Message; // Error occured
            }
        }

        public async Task<string> UserLogin(string username, string password)
        {
            var user = await _userDbContext.User_Details.FirstOrDefaultAsync(u => u.Username == username);
            if(user == null)
            {
                return "User Doesnot Exist";
            }
            string hashedPassword = HashPassword(password);
            if(hashedPassword == user.Password)
            {
                var jwtToken = CreateToken(user);
                return jwtToken;
            }
            
            return "Invalid Password";
        }

        private string CreateToken(User user)
        {
            const string keyToken = "Student Management Secret Token"; 

            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Name),
                new Claim(ClaimTypes.Role, user.Role),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyToken));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims:  claims, 
                //expires:  DateTime.Now.AddDays(1), 
                expires: DateTime.UtcNow.AddMinutes(2),
                signingCredentials: credentials);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            // Convert the password string to a byte array
            byte[] bytes = Encoding.UTF8.GetBytes(password);

            // Compute the hash
            byte[] hashBytes = sha256.ComputeHash(bytes);

            // Convert the hashed bytes back to a string
            StringBuilder builder = new StringBuilder();
            foreach (byte b in hashBytes)
            {
                builder.Append(b.ToString("x2"));
            }
            return builder.ToString();
        }
    }
}
