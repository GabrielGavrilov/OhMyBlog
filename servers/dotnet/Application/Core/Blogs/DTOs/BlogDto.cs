using System;
using System.ComponentModel.DataAnnotations;
using Application.Users.DTOs;
using Domain;

namespace Application.Blogs.DTOs;

public class BlogDto
{
    public string? Id { get; set; }
    public string? UserId { get; set; }
    public required string Title { get; set; }   
    public required string Body { get; set; }
    public DateTime? CreatedAt { get; set; }
}
