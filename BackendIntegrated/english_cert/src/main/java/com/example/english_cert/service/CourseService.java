package com.example.english_cert.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.english_cert.entity.Course;
import com.example.english_cert.entity.User;
import com.example.english_cert.repository.CourseRepo;

@Service
public class CourseService {

    @Autowired
    CourseRepo repo;
    
    @Autowired
    AuthenticationService service;

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

    
    public List<Course> getCoursesByPayment(Long paymentId) {
        return repo.findByPaymentsPaymentId(paymentId);
    }


    @Autowired
    private AuthenticationService studentService;

    public boolean deleteCourseById(Long courseId) {
        Optional<Course> courseOptional = repo.findById(courseId);
        
        if (courseOptional.isPresent()) {
            Course course = courseOptional.get();
            
            // Step 1: Disassociate the course from all students
            List<User> students = studentService.getStudentsByCourse(courseId);
            for (User student : students) {
                student.getCourses().remove(course);
                studentService.updateStudent(student.getId(), student);
            }
            
            // Step 2: Delete the course
            try {
                repo.deleteById(courseId);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        } else {
            return false;
        }
    }

    // public List<Course> getCoursesNotEnrolledByUser(Long userId) {
    //     // Fetch all courses except those enrolled by the user
    //     return repo.findCoursesNotEnrolledByUser(userId);
    // }

}