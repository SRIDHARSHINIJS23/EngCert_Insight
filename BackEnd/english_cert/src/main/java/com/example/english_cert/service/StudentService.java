package com.example.english_cert.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.english_cert.entity.Course;
import com.example.english_cert.entity.Enquiry;
import com.example.english_cert.entity.Student;
import com.example.english_cert.repository.StudentRepo;

@Service
public class StudentService {

    @Autowired
    StudentRepo repo;

    public boolean addStudent(Student student) {
        repo.save(student);
        return true;
    }

    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    public Optional<Student> getStudentById(Long studentId) {
        return repo.findById(studentId);
    }

    public Student updateStudent(Student student) {
        repo.save(student);
        return student;
    }

    public boolean deleteStudentById(Long studentId) {
        repo.deleteById(studentId);
        return true;
    }

    public List<Course> getCoursesByStudent(Long studentId) {
        return repo.findById(studentId).map(Student::getCourses).orElse(null);
    }

    public List<Enquiry> getEnquiriesByStudent(Long studentId) {
        return repo.findById(studentId).map(Student::getEnquiries).orElse(null);
    }

    // public List<PaymentService> getPaymentsByStudent(Long studentId) {
    //     return repo.findById(studentId).map(Student::getPayments).orElse(null);
    // }
}