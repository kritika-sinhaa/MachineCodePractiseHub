package com.practise.hub.dto;

import lombok.Data;

@Data
public class UserDto {
    private String email;
    private String username;
    private String password;
    // Add getters, setters, and other fields as needed
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
} 