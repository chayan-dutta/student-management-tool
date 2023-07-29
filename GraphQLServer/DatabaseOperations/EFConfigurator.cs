using DataAccessLayer.Data.DatabaseContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DataAccessLayer
{
    public class EFConfigurator
    {
        public static StudentDbContext CreateDbContext()
        {
            // var connectionstring = "Server=localhost\\SQLEXPRESS; Database=PracticeDB;Trusted_Connection=True;Encrypt=False" ;
            /*var connectionString = SetConnectionString();
            var serviceProvider = new ServiceCollection()
                 .AddDbContext<StudentDbContext>(options =>
                     options.UseSqlServer(connectionString))
                 .BuildServiceProvider();

            return serviceProvider.GetRequiredService<StudentDbContext>();*/
            var connectionString = SetConnectionString();
            var serviceProvider = new ServiceCollection()
                .AddDbContext<StudentDbContext>(options =>
                {
                    options.UseSqlServer(connectionString, sqlServerOptions =>
                    {
                        // Set your retry options here
                        sqlServerOptions.EnableRetryOnFailure(
                            maxRetryCount: 5,       // Maximum number of retries
                            maxRetryDelay: TimeSpan.FromSeconds(30),   // Maximum delay between retries
                            errorNumbersToAdd: null   // Any specific error numbers to add to the default set for retry
                        );
                    });
                })
                .BuildServiceProvider();

            return serviceProvider.GetRequiredService<StudentDbContext>();
        }

        public static UserDbContext CreateUserDbContext()
        {
            // var connectionstring = "Server=localhost\\SQLEXPRESS; Database=PracticeDB;Trusted_Connection=True;Encrypt=False" ;
            /*var connectionString = SetConnectionString();
            var serviceProvider = new ServiceCollection()
                .AddDbContext<UserDbContext>(options => 
                    options.UseSqlServer(connectionString))
                .BuildServiceProvider();          
            
            return serviceProvider.GetRequiredService<UserDbContext>();*/
            var connectionString = SetConnectionString();
            var serviceProvider = new ServiceCollection()
                .AddDbContext<UserDbContext>(options =>
                {
                    options.UseSqlServer(connectionString, sqlServerOptions =>
                    {
                        // Set your retry options here
                        sqlServerOptions.EnableRetryOnFailure(
                            maxRetryCount: 5,       // Maximum number of retries
                            maxRetryDelay: TimeSpan.FromSeconds(30),   // Maximum delay between retries
                            errorNumbersToAdd: null   // Any specific error numbers to add to the default set for retry
                        );
                    });
                })
                .BuildServiceProvider();

            return serviceProvider.GetRequiredService<UserDbContext>();
        }

        private static string SetConnectionString()
        {
            var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
            var dbName = Environment.GetEnvironmentVariable("DB_NAME");
            var password = Environment.GetEnvironmentVariable("DB_SA_PASSWORD");
            var connectionString = $"Data Source={dbHost};Initial Catalog={dbName};User ID=sa;Password={password};TrustServerCertificate=true";
            return connectionString;
        }
    }
}