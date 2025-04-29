using System;
using System.ComponentModel;
using Application.User.Assemblers;
using Application.User.DTOs;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.User.Commands;

public class CreateUser
{
    public class Command : IRequest<UserDto>
    {
        public required RegisterUserDto RegisterUserDto { get; set; }
    }

    public class Handler(UserManager<Domain.User> userManager) : IRequestHandler<Command, UserDto>
    {
        private readonly UserAssembler userAssembler = new UserAssembler();

        public async Task<UserDto> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = new Domain.User
            {
                UserName = request.RegisterUserDto.Email,
                Email = request.RegisterUserDto.Email,
                DisplayName = request.RegisterUserDto.DisplayName
            };

            var result = await userManager.CreateAsync(user, request.RegisterUserDto.Password);

            if (!result.Succeeded)
            {
                throw new Exception("Error creating user.");
            }

            return userAssembler.Assemble(user);
        }
    }
}
