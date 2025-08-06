package com.gabrielgavrilov.ohmyblog.controller;

import com.gabrielgavrilov.ohmyblog.api.LoginUserDto;
import com.gabrielgavrilov.ohmyblog.api.RegisterUserDto;
import com.gabrielgavrilov.ohmyblog.api.UserDto;
import com.gabrielgavrilov.ohmyblog.core.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public UserDto getCurrentUser(@RequestHeader("Authorization") String jwt) {
        return userService.getCurrentUser(jwt);
    }

    @GetMapping
    public UserDto getUserById(UUID userId) {
        return userService.getUserById(userId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto createUser(@RequestBody RegisterUserDto registerUserDto) {
        return userService.createUser(registerUserDto);
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody LoginUserDto loginUserDto) {
        return userService.loginUser(loginUserDto);
    }

}
