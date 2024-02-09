package com.example.english_cert.controller;

import org.springframework.web.bind.annotation.*;

import com.example.english_cert.entity.Course;
import com.example.english_cert.service.CourseService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/course")
public class CourseApiController {
    
    @Autowired
    CourseService service;

    @PostMapping("/add")
    public Course create(@RequestBody Course course) {
        return service.addCourse(course);
    }

    @GetMapping("/get")
    public List<Course> getAllCourseList() {
        return service.getAllCourses();
    }

    @GetMapping("/get/{id}")
    public Course getCourseById(@PathVariable Long id) {
        return service.getCourseById(id)
                     .orElseThrow(() -> new RuntimeException("Course not found with id " + id));
    }

    @PutMapping("/update/{id}")
    public Course updateCourseById(@PathVariable Long id, @RequestBody Course updatedCourse) {
        return service.updateCourseById(id, updatedCourse);
    }

    @DeleteMapping("/delete/{id}")
    public boolean deleteCourseById(@PathVariable Long id) {
        return service.deleteCourseById(id);
    }

    // @GetMapping("/getByPayment/{paymentId}")
    // public List<Course> getCoursesByPayment(@PathVariable Long paymentId) {
    //     return service.getCoursesByPayment(paymentId);
    // }
}