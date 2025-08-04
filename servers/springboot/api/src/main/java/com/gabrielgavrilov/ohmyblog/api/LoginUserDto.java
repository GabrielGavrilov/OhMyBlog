package com.gabrielgavrilov.ohmyblog.api;

import com.sun.net.httpserver.Filter;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class LoginUserDto {
    private String email;
    private String password;
}
