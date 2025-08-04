package com.gabrielgavrilov.ohmyblog.controller;

import com.gabrielgavrilov.ohmyblog.api.AuthUserDto;
import com.gabrielgavrilov.ohmyblog.api.UserDto;
import com.gabrielgavrilov.ohmyblog.core.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String createUser(@RequestBody AuthUserDto authUserDto) {
        return userService.createUser(authUserDto);
    }

}
