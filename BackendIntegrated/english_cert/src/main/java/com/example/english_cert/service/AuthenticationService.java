package com.example.english_cert.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.english_cert.dto.request.AuthenticationRequest;
import com.example.english_cert.dto.request.RegisterRequest;
import com.example.english_cert.dto.response.AuthenticationResponse;
import com.example.english_cert.entity.Course;
import com.example.english_cert.entity.Role;
import com.example.english_cert.entity.User;
import com.example.english_cert.repository.CourseRepo;
import com.example.english_cert.repository.UserRepository;
import com.example.english_cert.dto.request.RegisterRequest;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

//    public AuthenticationResponse register(RegisterRequest request) {
//     var user = User
//             .builder()
//             .name(request.getName())
//             .email(request.getEmail())
//             .password(passwordEncoder.encode(request.getPassword()))
//             .role(Role.USER)
//             .courses(new ArrayList<>()) // Set courses to an empty list
//             .build();
//     userRepository.save(user);

//     var jwtToken = jwtService.generateToken(user);
//     return AuthenticationResponse.builder()
//             .token(jwtToken)
//             .build();
// }



public AuthenticationResponse register(RegisterRequest request) {
    // Check if the email already exists in the database
    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
        throw new RuntimeException("Email already registered");
    }

    // Proceed with user registration if email is not already registered
    var user = User
            .builder()
            .name(request.getName())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.USER)
            .courses(new ArrayList<>()) // Set courses to an empty list
            .build();
    userRepository.save(user);

    var jwtToken = jwtService.generateToken(user);
    return AuthenticationResponse.builder()
            .token(jwtToken)
            .build();
}

public AuthenticationResponse authenticate(AuthenticationRequest request) {
    // Authenticate the user
    try {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    } catch (AuthenticationException e) {
        // Handle authentication failure
        throw new RuntimeException("Invalid email/password supplied", e);
    }
    
    // Authentication successful, generate JWT token
    var user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
    var jwtToken = jwtService.generateToken(user);
    return AuthenticationResponse.builder()
            .token(jwtToken)
            .build();
}


    @Autowired
    UserRepository repo;
   

    public List<User> getStudentsByCourse(Long courseId) {
        return repo.findByCoursesCourseId(courseId);
    }

   
    public List<User> getAllStudents() {
        return repo.findAll();
    }

    public Optional<User> getStudentById(Long studentId) {
        return repo.findById(studentId);
    }

    public User updateStudent(Long studentId,User user) {
        repo.save(user);
        return user;
    }

    public boolean deleteStudentById(Long studentId) {
        repo.deleteById(studentId);
        return true;
    }

    public User updateUser(Long id, User user) {
        Optional<User> optionalUser = repo.findById(id);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setName(user.getName());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
            existingUser.setRole(user.getRole());
            return repo.save(existingUser);
        } else {
            throw new RuntimeException("User not found with id " + id);
        }
    }
    
    
    @Autowired
    CourseRepo courseRepository;

    public void enrollUserInCourse(Long studentId, Long courseId) {
        // Check if both the user and the course exist
        Optional<User> optionalUser = userRepository.findById(studentId);
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
    
        if (optionalUser.isPresent() && optionalCourse.isPresent()) {
            User user = optionalUser.get();
            Course course = optionalCourse.get();

            // Check if the user is already enrolled in the course
            if (user.getCourses().contains(course)) {
                throw new RuntimeException("User is already enrolled in the course.");
            }

            // Add the course to the user's enrolled courses
            user.getCourses().add(course);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User or course not found.");
        }
    }
    public User getUserByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        return optionalUser.orElse(null);
    }
    
   
}