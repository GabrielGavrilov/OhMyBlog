package com.gabrielgavrilov.ohmyblog.api;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class AuthUserDto {
    private String email;
    private String displayName;
    private String password;
}
