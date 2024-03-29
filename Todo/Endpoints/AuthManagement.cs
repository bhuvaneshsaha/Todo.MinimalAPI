﻿using Carter;
using Mapster;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using System.Text;
using Todo.Core.Models;
using Todo.DTOs;
using Todo.Identity.Token;

namespace Todo.Endpoints
{
    public class AuthManagement : CarterModule
    {
        public AuthManagement(): base("auth")
        {
            
        }

        public override void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/login", async (LoginDto loginDto, SignInManager<AppUser> signInManager, UserManager <AppUser> userManager, ITokenGenerator tokenGenerator) =>
            {
                var user = await userManager.FindByEmailAsync(loginDto.Email);
                if (user == null)
                {
                    return Results.Unauthorized();
                }

                var results = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

                if (!results.Succeeded) return Results.Unauthorized();

                var token = await tokenGenerator.GenerateToken(user);

                var userToReturn = user.Adapt<UserDto>();

                return Results.Ok(new { token = token, user = userToReturn });
            }).AllowAnonymous();

            app.MapPost("/register", async (RegisterDto registerDto, UserManager<AppUser> _userManager) =>
            {
                var user = await _userManager.FindByEmailAsync(registerDto.Email);

                if (user != null)
                {
                    return Results.BadRequest("Email already exists");
                }

                var userToRegister = registerDto.Adapt<AppUser>();

                userToRegister.EmailConfirmed = true;

                var result = await _userManager.CreateAsync(userToRegister, registerDto.Password);

                if (!result.Succeeded)
                {
                    var sb = new StringBuilder();
                    foreach (var item in result.Errors)
                    {
                        sb.Append('[').Append(item.Description).Append(']');
                    }
                    throw new ArgumentException(sb.ToString());
                }

                var userToReturn = userToRegister.Adapt<UserDto>();

                return Results.Created($"/user/{userToRegister.Id}", userToReturn);
            }).AllowAnonymous();

            app.MapPost("/logout", async (SignInManager<AppUser> signInManager) =>
            {
                await signInManager.SignOutAsync();
                return Results.Ok();
            });
            

        }

        // endpoint for logout
       
    }
}
