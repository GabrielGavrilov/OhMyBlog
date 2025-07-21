package com.gabrielgavrilov.ohmyblog.assembler;

import com.gabrielgavrilov.ohmyblog.api.AuthUserDto;
import com.gabrielgavrilov.ohmyblog.api.UserDto;
import com.gabrielgavrilov.ohmyblog.core.user.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserAssembler {

    public UserDto assemble(User entity) {
        return new UserDto()
                .setId(entity.getUserId())
                .setEmail(entity.getEmail())
                .setDisplayName(entity.getDisplayName())
                .setDescription(entity.getDescription());
    }

    public User disassemble(AuthUserDto authUserDto) {
        return User.newInstance(
                authUserDto.getEmail(),
                authUserDto.getDisplayName(),
                authUserDto.getPassword()
        );
    }

    public User disassembleInto(UserDto userDto, User entity) {
        return entity
                .setDescription(userDto.getDescription());
    }

}
