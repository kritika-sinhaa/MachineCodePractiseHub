package com.practise.hub.controllers;

import com.practise.hub.dto.SubmissionDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.practise.hub.services.SubmissionService;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {
    @Autowired private SubmissionService submissionService;

    @PostMapping
    public ResponseEntity<?> submitSolution(@RequestBody SubmissionDto submissionDto) {
        return ResponseEntity.ok(submissionService.evaluateSubmission(submissionDto));
    }
}
