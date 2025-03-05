package com.practise.hub.dto;

import jakarta.persistence.Lob;

public class SubmissionDto {
    private Long problemId;
    private String code;
    private String functionalRequirements;
    private String classDesign;
    private String apiStructure;

    public Long getProblemId() {
        return problemId;
    }

    public void setProblemId(Long problemId) {
        this.problemId = problemId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getFunctionalRequirements() {
        return functionalRequirements;
    }

    public void setFunctionalRequirements(String functionalRequirements) {
        this.functionalRequirements = functionalRequirements;
    }

    public String getClassDesign() {
        return classDesign;
    }

    public void setClassDesign(String classDesign) {
        this.classDesign = classDesign;
    }

    public String getApiStructure() {
        return apiStructure;
    }

    public void setApiStructure(String apiStructure) {
        this.apiStructure = apiStructure;
    }
}