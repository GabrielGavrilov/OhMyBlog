using System;
using Domain.Users.DTOs;
using Microsoft.AspNetCore.Identity;

namespace Domain.Users.Validators;

public class UserValidator
{
    public List<ValidationError> ValidateIdentityResult(IdentityResult identityResult, RegisterUserDto registerUserDto)
    {
        List<ValidationError> errors = new List<ValidationError>();
        ICollection<string> errorCodes = identityResult.Errors
            .Select(e => e.Code)
            .ToList();

        if (string.IsNullOrWhiteSpace(registerUserDto.DisplayName))
        {
            errors.Add(new ValidationError { Field = "displayName", Message = "Username cannot be empty" });
        }

        if (errorCodes.Contains("DuplicateUserName"))
        {
            errors.Add(new ValidationError { Field = "email", Message = "Email is already taken" });
        }

        if (errorCodes.Contains("InvalidEmail"))
        {
            errors.Add(new ValidationError { Field = "email", Message = "Email must be valid" });
        }

        if (errorCodes.Contains("PasswordRequiresNonAlphanumeric") ||
            errorCodes.Contains("PasswordRequiresDigit") ||
            errorCodes.Contains("PasswordRequiresUpper"))
        {
            errors.Add(new ValidationError { Field = "password", Message = "Password must include at least one uppercase letter, one number, and one special character" });
        }

        return errors;
    }
}
