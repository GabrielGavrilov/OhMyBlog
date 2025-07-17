using System;

namespace Application.Blogs.DTOs;

public class BlogSearchCriteriaDto
{
    public string? Search { get; set; }
    public ICollection<string> UserId { get; set; } = [];
    public string Sort { get; set; } = "CreatedAt";
    public AutoFilterer.Enums.Sorting SortBy { get; set; } = AutoFilterer.Enums.Sorting.Descending;
}
