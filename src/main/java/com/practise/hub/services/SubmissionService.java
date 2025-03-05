package com.practise.hub.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.practise.hub.dto.SubmissionDto;
import java.util.HashMap;
import java.util.Map;

@Service
public class SubmissionService {

    private EvaluationService evaluationService;

    @Autowired
    public SubmissionService(EvaluationService evaluationService) {
        this.evaluationService = evaluationService;
    }

    public Object evaluateSubmission(SubmissionDto submissionDto) {

        if (submissionDto == null) {
            throw new IllegalArgumentException("Submission cannot be null");
        }

        // Create a response object to store evaluation results
        Map<String, Object> evaluationResult = new HashMap<>();
        
        try {
            // Perform basic validation
            boolean isValid = validateSubmission(submissionDto);
            evaluationResult.put("isValid", isValid);
            
            if (isValid) {
                // Process the submission
                // Add your specific evaluation criteria here
                evaluationResult.put("status", "PROCESSED");
                evaluationResult.put("score", calculateScore(submissionDto));
                evaluationResult.put("feedback", generateFeedback(submissionDto));
            } else {
                evaluationResult.put("status", "INVALID");
                evaluationResult.put("error", "Invalid submission format");
            }
            
        } catch (Exception e) {
            evaluationResult.put("status", "ERROR");
            evaluationResult.put("error", e.getMessage());
        }
        
        return evaluationResult;
    }

    private boolean validateSubmission(SubmissionDto submissionDto) {
        // Add your validation logic here
        return true;
    }

    private double calculateScore(SubmissionDto submissionDto) {
        // Add your scoring logic here
        return evaluationService.evaluate(submissionDto.getCode(),submissionDto.getFunctionalRequirements(),
                submissionDto.getClassDesign(),submissionDto.getApiStructure());
    }

    private String generateFeedback(SubmissionDto submissionDto) {
        // Add your feedback generation logic here
        // This is a placeholder implementation
        return "Submission processed successfully";
    }
} 