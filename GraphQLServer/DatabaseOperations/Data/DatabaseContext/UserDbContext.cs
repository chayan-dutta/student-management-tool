using DataAccessLayer.Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data.DatabaseContext
{
    public class UserDbContext: DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options): base(options) { }

        public DbSet<User> user_details { get; set; }
    }
}
