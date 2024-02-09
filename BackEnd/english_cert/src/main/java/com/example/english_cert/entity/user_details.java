package com.example.english_cert.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
public class user_details {

    @Id
    private Long userId;
    private String email;
    private String password;
    private String username;
    private String mobileno;
    private String userRole;
}