package com.gabrielgavrilov.ohmyblog.assembler;

import com.gabrielgavrilov.ohmyblog.api.AuthUserDto;
import com.gabrielgavrilov.ohmyblog.api.UserDto;
import com.gabrielgavrilov.ohmyblog.core.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserAssembler {
    private final PasswordEncoder passwordEncoder;

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
                passwordEncoder.encode(authUserDto.getPassword())
        );
    }

    public User disassembleInto(UserDto userDto, User entity) {
        return entity
                .setDescription(userDto.getDescription());
    }

}
