using Application.Core;
using Application.Users.Assemblers;
using Application.Users.DTOs;
using Domain.Users;
using Domain.Users.Validators;
using MediatR;
using Microsoft.AspNetCore.Identity;

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
                List<ValidationError> errors = userValidator.ValidateIdentityResult(result, request.RegisterUserDto);
                return Result<UserDto>.Failure(errors, 400);
            }

            return Result<UserDto>.Success(userAssembler.Assemble(user));
        }
    }
}
