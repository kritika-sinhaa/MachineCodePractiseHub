package com.practise.hub.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "submissions")
@Getter @Setter
public class UserSubmission {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Lob
    private String functionalRequirements;

    @Lob
    private String classDesign;

    @Lob
    private String apiStructure;

    @Lob
    private String code;

    private double score; // AI Score

}
