using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Domain.Blogs.Entities;
using Persistence;

namespace Infrastructure.Policies;

public class BlogAuthorPolicy : IAuthorizationRequirement
{

}

public class BlogAuthorPolicyHandler(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor) : AuthorizationHandler<BlogAuthorPolicy>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, BlogAuthorPolicy requirement)
    {
        var httpContext = httpContextAccessor.HttpContext;
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return;
        }

        if (httpContext?.GetRouteValue("id") is not string blogId)
        {
            return;
        }

        var blog = await dbContext.Blogs.SingleOrDefaultAsync(x => x.Id == blogId);

        if (blog == null)
        {
            return;
        }

        if (blog.UserId != userId)
        {
            return;
        }

        context.Succeed(requirement);
    }
}