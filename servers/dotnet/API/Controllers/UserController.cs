using Application.User.Commands;
using Application.User.DTOs;
using Application.User.Queries;
using Domain;
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
    }
}
