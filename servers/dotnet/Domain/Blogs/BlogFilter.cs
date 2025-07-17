using System;
using AutoFilterer.Attributes;
using AutoFilterer.Enums;
using AutoFilterer.Types;

namespace Domain.Blogs;

[PossibleSortings("CreatedAt")]
public class BlogFilter : PaginationFilterBase
{
    [ArraySearchFilter]
    [CompareTo("UserId")]
    public ICollection<string>? UserIds { get; set; }

    [CompareTo("Title")]
    [StringFilterOptions(StringFilterOption.Contains)]
    public string? Title { get; set; }
}
