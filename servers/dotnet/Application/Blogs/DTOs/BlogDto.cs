using Application.Users.DTOs;

namespace Application.Blogs.DTOs;

public class BlogDto
{
    public string? Id { get; set; } 
    public required string Title { get; set; }   
    public required string Body { get; set; }
    public DateTime? CreatedAt { get; set; }
    public BlogUserInformationDto? User { get; set; }
}
