using Application.Blogs.Queries;
using Application.Interfaces;
using Domain;
using Domain.Blogs.Assemblers;
using Domain.Blogs.Interfaces;
using Domain.Blogs.Validators;
using Domain.Users.Assemblers;
using Domain.Users.Entities;
using Domain.Users.Validators;
using Infrastructure.Accessor;
using Infrastructure.Policies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Blogs;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<GetBlogList.Handler>();
});

builder.Services.AddScoped<IUserAccessor, UserAccessor>();
builder.Services.AddScoped<IBlogRepository, BlogRepository>();

// Identity for authentication
builder.Services.AddIdentityApiEndpoints<User>(opt =>
{
    opt.User.RequireUniqueEmail = true;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<AppDbContext>();

// authorization
builder.Services.AddAuthorization(opt =>
{
    opt.AddPolicy("BlogAuthorPolicy", policy =>
    {
        policy.Requirements.Add(new BlogAuthorPolicy());
    });
});
builder.Services.AddTransient<IAuthorizationHandler, BlogAuthorPolicyHandler>();

builder.Services.AddSingleton<UserAssembler>();
builder.Services.AddSingleton<RegisterUserAssembler>();
builder.Services.AddSingleton<BlogAssembler>();
builder.Services.AddSingleton<BlogValidator>();
builder.Services.AddSingleton<UserValidator>();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:5173"));

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try 
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "error");
}

app.Run();
