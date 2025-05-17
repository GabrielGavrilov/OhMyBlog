using System;
using Microsoft.AspNetCore.Identity;

namespace Domain.Users.Validators;

public class UserValidator
{
    public Dictionary<string, string> ValidateIdentityResult(IdentityResult identityResult)
    {
        Dictionary<string, string> errors = new Dictionary<string, string>();
        ICollection<string> errorCodes = identityResult.Errors
            .Select(e => e.Code)
            .ToList();

        if (errorCodes.Contains("DuplicateUserName"))
        {
            errors.Add("email", "Email is already taken");
        }

        if (errorCodes.Contains("InvalidEmail"))
        {
            errors.Add("email", "Email must be valid");
        }

        if (errorCodes.Contains("PasswordRequiresNonAlphanumeric") ||
            errorCodes.Contains("PasswordRequiresDigit") ||
            errorCodes.Contains("PasswordRequiresUpper"))
        {
            errors.Add("password", "Password must include at least one uppercase letter, one number, and one special character");
        }

        return errors;
    }
}
