package com.attendance_system.sever.controller;

import com.attendance_system.sever.model.AuthResponse;
import com.attendance_system.sever.model.LoginRequest;
import com.attendance_system.sever.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtService jwtService;
    private final Map<String, String> userStore = new HashMap<>(); // In-memory user store

    @Autowired
    public AuthController(JwtService jwtService) {
        this.jwtService = jwtService;
        userStore.put("admin", "password"); // Example user for authentication
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Log the incoming request
        System.out.println("Login request received: " + loginRequest.getUsername() + ", " + loginRequest.getPassword());
        String password = userStore.get(loginRequest.getUsername());
        System.out.println("Retrieved password: " + password); // Log the retrieved password

        if (password == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username not found");
        } else if (!password.equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }

        // Generate JWT token
        String token = jwtService.generateToken(loginRequest.getUsername());
        return ResponseEntity.ok(new AuthResponse(token));
    }
}