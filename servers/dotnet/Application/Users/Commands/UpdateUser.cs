using System;
using Application.Common;
using Application.Interfaces;
using Application.Users.DTOs;
using Domain.Users;
using MediatR;

namespace Application.Users.Commands;

public class UpdateUser
{
    public class Command : IRequest<Result<UserDto>>
    {
        public required UserDto UserDto { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, IUserAssembler userAssembler, IUserRepository userRepository) : IRequestHandler<Command, Result<UserDto>>
    {
        public async Task<Result<UserDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            User existingUser = await userAccessor.GetUserAsync();
            await userRepository.UpdateAsync(userAssembler.DisassembleInto(request.UserDto, existingUser));
            return Result<UserDto>.Success(userAssembler.Assemble(existingUser));
        }
    }
}
