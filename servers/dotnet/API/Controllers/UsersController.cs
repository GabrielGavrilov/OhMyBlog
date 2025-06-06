using Application.Core.Users.Queries;
using Application.Users.Commands;
using Application.Users.Queries;
using Domain;
using Domain.Users.DTOs;
using Domain.Users.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersController(SignInManager<User> signInManager) : BaseApiController
    {
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<UserDto>> GetCurrentUserDetails()
        {
            return HandleResult(await Mediator.Send(new GetCurrentUserDetails.Query{}));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserInfo(string id)
        {
            return HandleResult(await Mediator.Send(new GetUserDetails.Query{Id = id}));
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> RegisterUser(RegisterUserDto registerUserDto)
        {
            return HandleResult(await Mediator.Send(new CreateUser.Command{RegisterUserDto = registerUserDto}));
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<ActionResult> LogoutUser()
        {
            await signInManager.SignOutAsync();
            return NoContent();
        }
    }
}
