package com.practise.hub.services;
import lombok.*;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import com.practise.hub.exceptions.*;
import com.practise.hub.entities.*;
import com.practise.hub.dto.*;
import com.practise.hub.repositories.UserRepository;
import com.practise.hub.providers.JwtTokenProvider;
import java.time.LocalDateTime;

@Data
@Builder
@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public Object register(UserDto userDto) {
        // Validate user input
        if (userDto == null || !StringUtils.hasText(userDto.getEmail()) || !StringUtils.hasText(userDto.getPassword())) {
            throw new BadRequestException("Email and password are required");
        }

        // Check if user already exists
        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new ConflictException("User already exists with this email");
        }

        // Create new user entity
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setUsername(userDto.getUsername());
        // Hash password before saving
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        user.setRole(Role.USER);

        // Save user to database
        User savedUser = userRepository.save(user);

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(savedUser);

        // Return response with token and user info
        return AuthResponse.builder()
                .token(token)
                .user(UserMapper.toDto(savedUser))
                .build();
    }

    public Object login(LoginDto loginDto) {
        // Validate login input
        if (loginDto == null || !StringUtils.hasText(loginDto.getEmail()) || !StringUtils.hasText(loginDto.getPassword())) {
            throw new BadRequestException("Email and password are required");
        }

        // Find user by email
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        // Verify password
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid email or password");
        }

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(user);

        // Return response with token and user info
        return AuthResponse.builder()
                .token(token)
                .user(UserMapper.toDto(user))
                .build();
    }
} 