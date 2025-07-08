using System;
using Application.Common;
using Application.Users.DTOs;
using Microsoft.AspNetCore.Identity;

namespace Application.Interfaces;

public interface IUserValidator
{
    public List<ValidationError> ValidateIdentityResult(IdentityResult identityResult, RegisterUserDto registerUserDto);
}
