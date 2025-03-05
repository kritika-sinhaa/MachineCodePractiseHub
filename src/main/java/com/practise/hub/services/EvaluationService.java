package com.practise.hub.services;

import org.springframework.stereotype.Service;

@Service
public class EvaluationService {
    // These can remain static as they are constants
    private static final double CODE_STRUCTURE_WEIGHT = 0.25;
    private static final double FUNCTIONAL_WEIGHT = 0.35;
    private static final double DESIGN_WEIGHT = 0.25;
    private static final double API_WEIGHT = 0.15;

    public double evaluate(String code, String functionalRequirements, String classDesign, String apiStructure) {
        double score = 0.0;

        // Remove static references by using instance methods
        score += evaluateCodeStructure(code) * CODE_STRUCTURE_WEIGHT;
        score += evaluateFunctionalRequirements(code, functionalRequirements) * FUNCTIONAL_WEIGHT;
        score += evaluateDesign(code, classDesign) * DESIGN_WEIGHT;
        score += evaluateApiStructure(code, apiStructure) * API_WEIGHT;

        return Math.min(score * 100, 100);
    }

    // Remove static keyword from these methods
    private double evaluateCodeStructure(String code) {
        double structureScore = 0.0;

        if (code.contains("public class")) structureScore += 0.2;
        if (code.contains("    ")) structureScore += 0.2;
        if (code.contains("private") || code.contains("protected")) structureScore += 0.2;
        if (code.contains("//") || code.contains("/*")) structureScore += 0.2;
        if (code.matches(".*[a-z][A-Z].*")) structureScore += 0.2;

        return structureScore;
    }

    private double evaluateFunctionalRequirements(String code, String requirements) {
        double functionalScore = 0.0;

        if (requirements != null && !requirements.isEmpty()) {
            String[] reqLines = requirements.split("\n");
            for (String req : reqLines) {
                if (code.contains(req.trim())) {
                    functionalScore += 1.0 / reqLines.length;
                }
            }
        }

        return functionalScore;
    }

    private double evaluateDesign(String code, String expectedDesign) {
        double designScore = 0.0;

        if (code.contains("interface")) designScore += 0.2;
        if (code.contains("extends") || code.contains("implements")) designScore += 0.2;
        if (code.contains("private")) designScore += 0.2;
        if (!code.contains("static")) designScore += 0.2;
        if (code.contains("@Override")) designScore += 0.2;

        return designScore;
    }

    private double evaluateApiStructure(String code, String expectedApi) {
        double apiScore = 0.0;

        if (code.contains("@RestController")) apiScore += 0.2;
        if (code.contains("@RequestMapping")) apiScore += 0.2;
        if (code.contains("ResponseEntity")) apiScore += 0.2;
        if (code.contains("@PathVariable") || code.contains("@RequestParam")) apiScore += 0.2;
        if (code.contains("@RequestBody")) apiScore += 0.2;

        return apiScore;
    }
}