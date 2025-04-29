using System;
using System.ComponentModel.DataAnnotations;

namespace Domain;

public class Blog
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public required string Body { get; set; }

    public string? UserId { get; set; }
    public User User { get; set; } = null!;

    public static Blog NewInstance(string blogTitle, string blogBody)
    {
        return new Blog
        {
            Id = Guid.NewGuid().ToString(),
            Title = blogTitle,
            Body = blogBody
        };
    }

}
