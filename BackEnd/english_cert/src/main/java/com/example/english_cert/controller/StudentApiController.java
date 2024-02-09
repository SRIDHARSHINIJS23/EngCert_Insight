package com.example.english_cert.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.english_cert.entity.Course;
import com.example.english_cert.entity.Enquiry;
// import com.example.english_cert.entity.Payment;
import com.example.english_cert.entity.Student;
import com.example.english_cert.service.StudentService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/student")
public class StudentApiController {

    @Autowired
    StudentService service;

    @PostMapping("/add")
    public boolean addStudent(@RequestBody Student student) {
        return service.addStudent(student);
    }

    @GetMapping("/get")
    public List<Student> getAllStudents() {
        return service.getAllStudents();
    }

    @GetMapping("/get/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return service.getStudentById(id)
                      .orElseThrow(() -> new RuntimeException("Student not found with id " + id));
    }

    @PutMapping("/update")
    public Student updateStudent(@RequestBody Student student) {
        return service.updateStudent(student);
    }

    @DeleteMapping("/delete/{id}")
    public boolean deleteStudentById(@PathVariable Long id) {
        return service.deleteStudentById(id);
    }

    @GetMapping("/get/{studentId}/courses")
    public List<Course> getCoursesByStudent(@PathVariable Long studentId) {
        return service.getCoursesByStudent(studentId);
    }

    @GetMapping("/get/{studentId}/enquiries")
    public List<Enquiry> getEnquiriesByStudent(@PathVariable Long studentId) {
        return service.getEnquiriesByStudent(studentId);
    }

    // @GetMapping("/get/{studentId}/payments")
    // public List<Payment> getPaymentsByStudent(@PathVariable Long studentId) {
    //     return service.getPaymentsByStudent(studentId);
    // }
}