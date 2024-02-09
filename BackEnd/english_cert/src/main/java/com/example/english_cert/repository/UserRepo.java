package com.example.english_cert.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.english_cert.entity.user_details;

@Repository
public interface UserRepo extends JpaRepository<user_details,Long>{

}