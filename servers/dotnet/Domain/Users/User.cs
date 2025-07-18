using System;
using Domain.Blogs;
using Microsoft.AspNetCore.Identity;

namespace Domain.Users;

public class User : IdentityUser
{
    public string? DisplayName { get; set; }
    public string? Description { get; set; }
    public ICollection<Blog> Blogs { get; set; } = [];
}
