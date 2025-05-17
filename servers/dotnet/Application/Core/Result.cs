using System;
using Domain;

namespace Application.Core;

public class Result<T>
{

    public bool IsSuccess { get; set; }
    public T? Value { get; set; }
    public List<ValidationError>? Errors { get; set; }
    // could be an enum
    public int Code { get; set; }

    public static Result<T> Success(T value) => new ()
    {
        IsSuccess = true,
        Value = value
    };

    public static Result<T> Failure(int code) => new ()
    {
        IsSuccess = false,
        Code = code
    };

    public static Result<T> Failure(List<ValidationError> errors, int code) => new ()
    {
        IsSuccess = false,
        Errors = errors,
        Code = code
    };

}
