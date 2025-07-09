using System;
using AutoFilterer.Attributes;
using AutoFilterer.Enums;
using AutoFilterer.Types;

namespace Domain.Blogs;

[PossibleSortings("CreatedAt")]
public class BlogFilter : PaginationFilterBase
{
    [CompareTo("UserId")]
    [StringFilterOptions(StringFilterOption.Contains)]
    public string? UserId { get; set; }
}
