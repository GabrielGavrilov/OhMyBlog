using System;
using Domain;
using Domain.Blogs.Entities;
using Domain.Users.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options) :  IdentityDbContext<User>(options)
{
    public DbSet<Blog> Blogs {get; set;}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // builder.Entity<Blog>(x => x.HasKey(a => a.Id));
        builder.Entity<Blog>()
            .HasOne(x => x.User)
            .WithMany(x => x.Blogs)
            .HasForeignKey(x => x.UserId);
    }
}
