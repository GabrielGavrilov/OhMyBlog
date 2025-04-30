using Application.Users.Commands;
using Application.Users.DTOs;
using Application.Users.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController(SignInManager<User> signInManager) : BaseApiController
    {
        [HttpGet]
        public async Task<UserDto> GetUserInfo()
        {
            return await Mediator.Send(new GetUserDetails.Query{});
        }

        [HttpPost]
        public async Task<UserDto> RegisterUser(RegisterUserDto registerUserDto)
        {
            return await Mediator.Send(new CreateUser.Command{RegisterUserDto = registerUserDto});
        }

        [HttpPost("logout")]
        public async Task<ActionResult> LogoutUser()
        {
            await signInManager.SignOutAsync();
            return NoContent();
        }
    }
}
