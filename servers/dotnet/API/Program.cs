using Application.Blogs;
using Application.Blogs.Assemblers;
using Application.Blogs.Queries;
using Application.Common;
using Application.Interfaces;
using Application.Users.Assemblers;
using Domain.Blogs;
using Domain.Users;
using Domain.Users.Validators;
using Infrastructure.Accessor;
using Infrastructure.Policies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Blogs;
using Persistence.Users;

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
    x.RegisterServicesFromAssemblyContaining<FindBlogs.Handler>();
});

// core scopes
builder.Services.AddScoped<IUserAccessor, UserAccessor>();
builder.Services.AddScoped<IPageAssembler, PageAssembler>();

// blog scopes
builder.Services.AddScoped<IBlogRepository, BlogRepository>();
builder.Services.AddScoped<IBlogValidator, BlogValidator>();
builder.Services.AddScoped<IBlogAssembler, BlogAssembler>();
builder.Services.AddScoped<ICreateBlogAssembler, CreateBlogAssembler>();

// user scopes
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserAssembler, UserAssembler>();
builder.Services.AddScoped<IBlogUserAssembler, BlogUserAssembler>();
builder.Services.AddScoped<IRegisterUserAssembler, RegisterUserAssembler>();
builder.Services.AddScoped<IUserValidator, UserValidator>();

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

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// CORS
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:5173"));

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();
app.MapFallbackToController("Index", "Fallback");
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
