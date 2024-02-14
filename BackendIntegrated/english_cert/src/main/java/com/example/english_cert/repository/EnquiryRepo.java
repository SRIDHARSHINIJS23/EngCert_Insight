package com.example.english_cert.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.english_cert.entity.Enquiry;


@Repository
public interface EnquiryRepo extends JpaRepository<Enquiry,Long>{
    // List<Enquiry> findByCourseId(Long courseId);
    //  List<Student> findByCoursesCourseId(Long courseId);
}