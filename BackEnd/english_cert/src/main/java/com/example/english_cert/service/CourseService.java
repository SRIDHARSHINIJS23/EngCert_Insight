package com.example.english_cert.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.english_cert.entity.Course;
import com.example.english_cert.repository.CourseRepo;

@Service
public class CourseService {

    @Autowired
    CourseRepo repo;

    public Course addCourse(Course course) {
        return repo.save(course);
    }

    public List<Course> getAllCourses() {
        return repo.findAll();
    }

    public Optional<Course> getCourseById(Long courseId) {
        return repo.findById(courseId);
    }

    public Course updateCourseById(Long courseId, Course updatedCourse) {
        return repo.findById(courseId).map(course -> {
            course.setCourseName(updatedCourse.getCourseName());
            course.setDescription(updatedCourse.getDescription());
            course.setDuration(updatedCourse.getDuration());
            course.setCost(updatedCourse.getCost());
            return repo.save(course);
        }).orElse(null);
    }

    public boolean deleteCourseById(Long courseId) {
        if (repo.existsById(courseId)) {
            repo.deleteById(courseId);
            return true;
        }
        return false;
    }

   
    public List<Course> getCoursesByPayment(Long paymentId) {
        return repo.findByPaymentsPaymentId(paymentId);
    }
}