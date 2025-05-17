using System;

namespace Domain;

public class ValidationError
{
    public required string Field { get; set; }
    public required string Message { get; set; }
}
