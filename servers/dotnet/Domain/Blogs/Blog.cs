using Domain.Users;

namespace Domain.Blogs;

public class Blog
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Title { get; set; }
    public required string Body { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public required string UserId { get; set; }
    public User User { get; set; } = null!;

}
