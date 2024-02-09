package com.example.english_cert.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@NoArgsConstructor
@Data
@Getter
@Setter
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId;
    private String courseName;
    private String description;
    private String duration;
    private Long cost;

    @OneToMany
    @JoinColumn(name="course_id")
    @JsonIgnore
    private Set<Enquiry> enquiries;
    

    @OneToMany
    @JoinColumn(name = "course_id")
    @JsonIgnore
    private Set<Payment> payments;

    @OneToMany
    @JoinColumn(name = "course_id")
    @JsonIgnore
    private Set<Student> student;

   

}