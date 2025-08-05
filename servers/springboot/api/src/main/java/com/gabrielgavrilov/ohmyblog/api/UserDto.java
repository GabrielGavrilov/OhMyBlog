package com.gabrielgavrilov.ohmyblog.api;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.UUID;

@Data
@Accessors(chain = true)
public class UserDto {
    private UUID userId;
    private String email;
    private String displayName;
    private String description;
}
