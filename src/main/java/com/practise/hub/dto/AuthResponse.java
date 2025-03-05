package com.practise.hub.dto;

public class AuthResponse {
    private String token;
    private UserDto user;

    private AuthResponse(String token, UserDto user) {
        this.token = token;
        this.user = user;
    }

    public static AuthResponseBuilder builder() {

        return new AuthResponseBuilder();
    }

    public static class AuthResponseBuilder {
        private String token;
        private UserDto user;

        public AuthResponseBuilder token(String token) {
            this.token = token;
            return this;
        }

        public AuthResponseBuilder user(UserDto user) {
            this.user = user;
            return this;
        }

        public AuthResponse build() {
            return new AuthResponse(token, user);
        }
    }

    // Getters
    public String getToken() {
        return token;
    }

    public UserDto getUser() {
        return user;
    }
} 