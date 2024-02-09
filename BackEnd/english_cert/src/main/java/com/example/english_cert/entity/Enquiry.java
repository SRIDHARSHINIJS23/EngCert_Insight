package com.example.english_cert.entity;

import java.sql.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Data
@Getter
@Setter
@AllArgsConstructor
public class Enquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long enquiryId;
    private Long student_id;
    private Date enquiryDate;
    private String title;
    private String description;
    private String email;
    private String enquiryType;
    private String response;
    
    
    // @ManyToOne
    // @JoinColumn(name = "student_id")a
    // private Student student;
 
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToMany
    @JoinColumn(name = "enquiry_id")
    @JsonIgnore
    private Set<Student> student;

}