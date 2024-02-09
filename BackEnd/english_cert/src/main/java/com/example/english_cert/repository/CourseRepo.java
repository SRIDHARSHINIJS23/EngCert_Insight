package com.example.english_cert.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.english_cert.entity.Course;

@Repository
public interface CourseRepo extends JpaRepository<Course, Long>{
    
    List<Course> findByPaymentsPaymentId(Long paymentId);
}