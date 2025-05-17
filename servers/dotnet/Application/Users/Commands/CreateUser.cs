using System;
using System.ComponentModel;
using Application.Core;
using Domain;
using Domain.Users.Assemblers;
using Domain.Users.DTOs;
using Domain.Users.Entities;
using Domain.Users.Validators;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Users.Commands;

public class CreateUser
{
    public class Command : IRequest<Result<UserDto>>
    {
        public required RegisterUserDto RegisterUserDto { get; set; }
    }

    public class Handler(
        UserManager<User> userManager,
        UserAssembler userAssembler,
        RegisterUserAssembler registerUserAssembler,
        UserValidator userValidator
    ) : IRequestHandler<Command, Result<UserDto>>
    {
        public async Task<Result<UserDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            User user = registerUserAssembler.Disassemble(request.RegisterUserDto);
            var result = await userManager.CreateAsync(user, request.RegisterUserDto.Password);

            if (!result.Succeeded)
            {
                List<ValidationError> errors = userValidator.ValidateIdentityResult(result);
                return Result<UserDto>.Failure(errors, 400);
            }

            return Result<UserDto>.Success(userAssembler.Assemble(user));
        }
    }
}
