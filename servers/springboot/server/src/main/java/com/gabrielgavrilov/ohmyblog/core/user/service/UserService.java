package com.gabrielgavrilov.ohmyblog.core.user.service;

import com.gabrielgavrilov.ohmyblog.api.LoginUserDto;
import com.gabrielgavrilov.ohmyblog.api.RegisterUserDto;
import com.gabrielgavrilov.ohmyblog.api.UserDto;
import com.gabrielgavrilov.ohmyblog.assembler.UserAssembler;
import com.gabrielgavrilov.ohmyblog.core.jwt.service.JwtService;
import com.gabrielgavrilov.ohmyblog.core.user.entity.User;
import com.gabrielgavrilov.ohmyblog.core.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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

    public UserDto getCurrentUser(String jwt) {
        return jwtService.extractUserDto(jwt.split(" ")[1]);
    }

    public UserDto createUser(RegisterUserDto registerUserDto) {
        return saveUser(userAssembler.disassemble(registerUserDto));
    }

    public String loginUser(LoginUserDto loginUserDto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginUserDto.getEmail(),
                loginUserDto.getPassword()
        ));
        User user = userRepository.findByEmail(loginUserDto.getEmail()).orElseThrow();
        return jwtService.generateToken(user);
    }

    private UserDto saveUser(User user) {
        return userAssembler.assemble(userRepository.save(user));
    }

}
