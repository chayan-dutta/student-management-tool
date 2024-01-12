using DataAccessLayer;
using DataAccessLayer.CRUDOperations;
using GraphQLServer.GraphQLOerations;
using GraphQLServer.TokenService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpContextAccessor();

var tokenValidationParams = new TokenValidationParameters
{
    IssuerSigningKey =
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Student Management Secret Token")),
    ValidateIssuerSigningKey = true,
    ValidateAudience = false,
    ValidateIssuer = false,
    ValidateLifetime = true,
};

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = tokenValidationParams;
    });


builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Student", policy => policy.RequireClaim(ClaimTypes.Role, "Student"));
    options.AddPolicy("Teacher", policy => policy.RequireClaim(ClaimTypes.Role, "Teacher"));
    options.AddPolicy("Admin", policy => policy.RequireClaim(ClaimTypes.Role, "Admin"));
});

builder.Services.AddGraphQLServer()
    .AddQueryType<QueryType>()
    .AddMutationType<MutationType>()
    .AddAuthorization();

/*builder.Services.AddDbContext<StudentDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Student_ConnectionString"));
});*/

/*var connectionString = "\"Server=localhost\\\\SQLEXPRESS; Database=PracticeDB;Trusted_Connection=True;Encrypt=False\"";

var DbContext = EFConfigurator.CreateDbContext(connectionString);*/

// builder.Services.AddSingleton(DbContext);
builder.Services.AddScoped<CRUDOperations>();
builder.Services.AddScoped<RegisterAndLoginOperation>();
builder.Services.AddScoped<JwtTokenService>();
builder.Services.AddSingleton(tokenValidationParams);

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

// app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseCors("MyAllowSpecificOrigins");

app.MapControllers();

app.MapGraphQL();

app.Run();
