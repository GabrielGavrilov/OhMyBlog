using Application.Core.Users.Queries;
using Application.Users.Commands;
using Application.Users.DTOs;
using Application.Users.Queries;
using Domain.Users;
using Microsoft.AspNetCore.Authorization;
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
            return HandleResult(await Mediator.Send(new GetCurrentUser.Query { }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserInfo(string id)
        {
            return HandleResult(await Mediator.Send(new GetUserById.Query { Id = id }));
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> RegisterUser(RegisterUserDto registerUserDto)
        {
            return HandleResult(await Mediator.Send(new CreateUser.Command { RegisterUserDto = registerUserDto }));
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<ActionResult> LogoutUser()
        {
            await signInManager.SignOutAsync();
            return NoContent();
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<UserDto>> UpdateUser(UserDto userDto)
        {
            return HandleResult(await Mediator.Send(new UpdateUser.Command { UserDto = userDto }));
        }
    }
}
