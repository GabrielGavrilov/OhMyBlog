package com.gabrielgavrilov.ohmyblog.core.user.service;

import com.gabrielgavrilov.ohmyblog.api.AuthUserDto;
import com.gabrielgavrilov.ohmyblog.api.UserDto;
import com.gabrielgavrilov.ohmyblog.assembler.UserAssembler;
import com.gabrielgavrilov.ohmyblog.core.user.entity.User;
import com.gabrielgavrilov.ohmyblog.core.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    public final UserAssembler userAssembler;
    public final UserRepository userRepository;

    public UserDto createUser(AuthUserDto authUserDto) {
        return saveUser(userAssembler.disassemble(authUserDto));
    }

    private UserDto saveUser(User user) {
        return userAssembler.assemble(userRepository.save(user));
    }

}
