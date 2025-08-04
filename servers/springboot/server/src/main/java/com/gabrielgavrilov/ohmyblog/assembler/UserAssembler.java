package com.gabrielgavrilov.ohmyblog.assembler;

import com.gabrielgavrilov.ohmyblog.api.RegisterUserDto;
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

    public User disassemble(RegisterUserDto registerUserDto) {
        return User.newInstance(
                registerUserDto.getEmail(),
                registerUserDto.getDisplayName(),
                passwordEncoder.encode(registerUserDto.getPassword())
        );
    }

    public User disassembleInto(UserDto userDto, User entity) {
        return entity
                .setDescription(userDto.getDescription());
    }

}
