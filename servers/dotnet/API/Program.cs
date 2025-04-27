using Application.Blogs.Queries;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllers();


builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<GetBlogList.Handler>();
});


// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000"));

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// authentication will come before authorization here.
app.UseAuthorization();

app.MapControllers();
app.MapGroup("api");

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
