package com.example.english_cert.controller;

import org.springframework.web.bind.annotation.*;

import com.example.english_cert.entity.Course;

import com.example.english_cert.entity.User;
import com.example.english_cert.repository.UserRepository;
import com.example.english_cert.service.AuthenticationService;
import com.example.english_cert.service.CourseService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/course")
// @CrossOrigin(origins = "http://localhost:5173")
public class CourseApiController {
    
    @Autowired
    CourseService service;

    @Autowired
    AuthenticationService service2;

    @Autowired
    UserRepository userRepository;

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

    // @DeleteMapping("/delete/{id}")
    // public boolean deleteCourseById(@PathVariable Long id) {
    //     return service.deleteCourseById(id);
    // }

    @DeleteMapping("/delete/{id}")
public boolean deleteCourseById(@PathVariable Long id) {
    // Step 1: Retrieve the course by ID
    Optional<Course> courseOptional = service.getCourseById(id);
    
    if (courseOptional.isPresent()) {
        Course course = courseOptional.get();
        
        // Step 2: Remove the course from all students
        for (User user : course.getUser()) {
            user.getCourses().remove(course);
            service2.updateUser(user.getId(), user);
        }
        
        // Step 3: Delete the course
        return service.deleteCourseById(id);
    } else {
        throw new RuntimeException("Course not found with id " + id);
    }
}

    @GetMapping("/getByPayment/{paymentId}")
    public List<Course> getCoursesByPayment(@PathVariable Long paymentId) {
        return service.getCoursesByPayment(paymentId);
    }

//     @GetMapping("/notEnrolled")
// public List<Course> getCoursesNotEnrolledByCurrentUser() {
//     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//     String userEmail = authentication.getName();
//     Optional<User> optionalUser = userRepository.findByEmail(userEmail);

//     if (optionalUser.isPresent()) {
//         User user = optionalUser.get();
//         return service.getCoursesNotEnrolledByUser(user.getId());
//     } else {
//         throw new RuntimeException("Current user not found.");
//     }
// }

    
}