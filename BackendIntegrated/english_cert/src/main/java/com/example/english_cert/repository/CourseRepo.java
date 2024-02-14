package com.example.english_cert.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.english_cert.entity.Course;

@Repository
public interface CourseRepo extends JpaRepository<Course, Long>{
    
    List<Course> findByPaymentsPaymentId(Long paymentId);


    // @Query("SELECT c FROM Course c WHERE c NOT IN (SELECT u.courses FROM User u WHERE u.id = :userId)")
    // List<Course> findCoursesNotEnrolledByUser(@Param("userId") Long userId);
     
}