using System;
using Domain.Blogs.Entities;
using Microsoft.AspNetCore.Identity;

namespace Domain.Users.Entities;

public class User : IdentityUser
{
    public string? DisplayName { get; set; }

    public ICollection<Blog> Blogs {get; set;} = [];

    public static User NewInstance(string email, string displayName)
    {
        return new User
        {
            UserName = email,
            Email = email,
            DisplayName = displayName
        };
    }

}
