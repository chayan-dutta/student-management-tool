using DataAccessLayer.Data.DatabaseContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DataAccessLayer
{
    public class EFConfigurator
    {
        public static StudentDbContext CreateDbContext()
        {
            var serviceProvider = new ServiceCollection()
                 .AddDbContext<StudentDbContext>(options =>
                     options.UseSqlServer("Server=localhost\\SQLEXPRESS; Database=PracticeDB;Trusted_Connection=True;Encrypt=False"))
                 .BuildServiceProvider();

            return serviceProvider.GetRequiredService<StudentDbContext>();
        }

        public static UserDbContext CreateUserDbContext()
        {
            var serviceProvider = new ServiceCollection()
                .AddDbContext<UserDbContext>(options => 
                    options.UseSqlServer("Server=localhost\\SQLEXPRESS; Database=PracticeDB;Trusted_Connection=True;Encrypt=False"))
                .BuildServiceProvider();
            
            return serviceProvider.GetRequiredService<UserDbContext>();
        }
    }
}