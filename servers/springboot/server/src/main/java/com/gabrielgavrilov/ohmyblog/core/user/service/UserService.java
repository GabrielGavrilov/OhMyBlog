package com.gabrielgavrilov.ohmyblog.core.user.service;

import com.gabrielgavrilov.ohmyblog.api.AuthUserDto;
import com.gabrielgavrilov.ohmyblog.api.UserDto;
import com.gabrielgavrilov.ohmyblog.assembler.UserAssembler;
import com.gabrielgavrilov.ohmyblog.core.jwt.service.JwtService;
import com.gabrielgavrilov.ohmyblog.core.user.entity.User;
import com.gabrielgavrilov.ohmyblog.core.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserAssembler userAssembler;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public String createUser(AuthUserDto authUserDto) {
        User user = userAssembler.disassemble(authUserDto);
        return jwtService.generateToken(user);
    }

    private UserDto saveUser(User user) {
        return userAssembler.assemble(userRepository.save(user));
    }

}
