package com.your.package.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    @PostMapping("/evaluate/{problemId}")
    @PreAuthorize("isAuthenticated()")  // Ensure user is authenticated
    public ResponseEntity<?> evaluateSubmission(
            @PathVariable Long problemId,
            @RequestBody SubmissionRequest submission,
            @AuthenticationPrincipal UserDetails userDetails  // Get current user
    ) {
        // Your evaluation logic here
        return ResponseEntity.ok(result);
    }
} 