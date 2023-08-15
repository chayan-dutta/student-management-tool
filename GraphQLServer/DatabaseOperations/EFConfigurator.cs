using DataAccessLayer.Data.DatabaseContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace DataAccessLayer
{
    public class EFConfigurator
    {
        public static StudentDbContext CreateDbContext()
        {
            //var connectionstring = "Host=postgres-db;Database=PracticeDB;UserName=postgres;Password=postgres;";
            var connectionstring = Environment.GetEnvironmentVariable("ConnectionString");
            var serviceProvider = new ServiceCollection()
                 .AddDbContext<StudentDbContext>(options =>
                     options.UseNpgsql(connectionstring))
            .BuildServiceProvider();

            return serviceProvider.GetRequiredService<StudentDbContext>();
        }

        public static UserDbContext CreateUserDbContext()
        {
            //var connectionstring = "Host=postgres-db;Database=PracticeDB;UserName=postgres;Password=postgres;";
            var connectionstring = Environment.GetEnvironmentVariable("ConnectionString");
            var serviceProvider = new ServiceCollection()
                .AddDbContext<UserDbContext>(options =>
                    options.UseNpgsql(connectionstring))
                .BuildServiceProvider();

            return serviceProvider.GetRequiredService<UserDbContext>();

        }

        /* private static string SetConnectionString()
         {
             var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
             var dbName = Environment.GetEnvironmentVariable("DB_NAME");
             var password = Environment.GetEnvironmentVariable("DB_SA_PASSWORD");
             var connectionString = $"Data Source={dbHost};Initial Catalog={dbName};User ID=sa;Password={password};TrustServerCertificate=true";
             return connectionString;
         }*/
    }
}