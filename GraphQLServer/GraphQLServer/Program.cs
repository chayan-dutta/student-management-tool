using DataAccessLayer;
using DataAccessLayer.CRUDOperations;
using GraphQLServer.GraphQLOerations;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddGraphQLServer()
    .AddQueryType<QueryType>()
    .AddMutationType<MutationType>();

/*builder.Services.AddDbContext<StudentDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Student_ConnectionString"));
});*/

/*var connectionString = "\"Server=localhost\\\\SQLEXPRESS; Database=PracticeDB;Trusted_Connection=True;Encrypt=False\"";

var DbContext = EFConfigurator.CreateDbContext(connectionString);*/

// builder.Services.AddSingleton(DbContext);
builder.Services.AddScoped<CRUDOperations>();
builder.Services.AddScoped<RegisterAndLoginOperation>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyAllowSpecificOrigins",
                      policy =>
                      {
                          policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("MyAllowSpecificOrigins");

app.MapControllers();

app.MapGraphQL();

app.Run();
