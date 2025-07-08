using System;
using Application.Blogs.DTOs;
using Application.Core;
using Microsoft.EntityFrameworkCore;

namespace Application.Interfaces;

public interface IBlogValidator
{
    public List<ValidationError> Validate(BlogDto blogDto);
}
