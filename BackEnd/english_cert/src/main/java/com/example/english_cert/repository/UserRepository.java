package com.example.english_cert.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.english_cert.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
