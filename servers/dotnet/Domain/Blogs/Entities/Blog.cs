using Domain.Users.Entities;

namespace Domain.Blogs.Entities;

public class Blog
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public required string Body { get; set; }
    public DateTime CreatedAt { get; set; }

    public required string UserId { get; set; }
    public User User { get; set; } = null!;

    public static Blog NewInstance(string title, string body, string userId)
    {
        return new Blog
        {
            Id = Guid.NewGuid().ToString(),
            Title = title,
            Body = body,
            UserId = userId,
            CreatedAt = DateTime.UtcNow
        };
    }

}
