using System;

namespace Application.Core;

public class ValidationError
{
    public required string Field { get; set; }
    public required string Message { get; set; }
}
