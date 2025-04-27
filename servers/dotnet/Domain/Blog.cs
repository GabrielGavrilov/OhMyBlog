using System;

namespace Domain;

public class Blog
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Title { get; set; }
    public required string Body { get; set; }
}
