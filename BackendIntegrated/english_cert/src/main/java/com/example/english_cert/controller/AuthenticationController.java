package com.example.english_cert.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.english_cert.dto.request.AuthenticationRequest;
import com.example.english_cert.dto.request.RegisterRequest;
import com.example.english_cert.dto.response.AuthenticationResponse;
import com.example.english_cert.entity.User;
import com.example.english_cert.repository.UserRepository;
import com.example.english_cert.service.AuthenticationService;
import org.springframework.security.core.context.SecurityContextHolder;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterRequest request) {
        authenticationService.register(request);
    
        Map<String, String> response = new HashMap<>();
        response.put("message", "Registration successful");
    
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/authenticate")
    public ResponseEntity<Map<String, Object>> authenticate(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse authenticationResponse = authenticationService.authenticate(request);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("authenticationResponse", authenticationResponse);

        return ResponseEntity.ok(response);
    }

    @Autowired
    AuthenticationService service;

    @GetMapping("/get")
    public List<User> getAllStudents() {
        return service.getAllStudents();
    }

    @GetMapping("/get/{id}")
    public User getStudentById(@PathVariable Long id) {
        return service.getStudentById(id)
                      .orElseThrow(() -> new RuntimeException("Student not found with id " + id));
    }

    @PutMapping("/update/{id}")
    public User updateStudent(@PathVariable long id,@RequestBody User user) {
        return service.updateStudent(id,user);
    }

    @DeleteMapping("/delete/{id}")
    public boolean deleteStudentById(@PathVariable Long id) {
        return service.deleteStudentById(id);
    }

    

    // Uncomment if needed
    // @GetMapping("/get/{Id}/enquiries")
    // public List<Enquiry> getEnquiriesByStudent(@PathVariable Long Id) {
    //     return service.getEnquiriesByStudent(Id);
    // }

    @GetMapping("/getByCourse/{courseId}")
    public List<User> getStudentsByCourse(@PathVariable Long courseId) {
        return service.getStudentsByCourse(courseId);
    }
    

    @Autowired
    UserRepository userRepository;
    @GetMapping("/current")
public ResponseEntity<User> getCurrentUser(Authentication authentication) {
    if (authentication != null && authentication.isAuthenticated()) {
        // Retrieve the current authenticated user's email
        String userEmail = authentication.getName();

        // Retrieve the user from the database based on the email
        Optional<User> optionalUser = userRepository.findByEmail(userEmail);

        // Check if the user exists
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    } else {
        // User is not authenticated
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}

@PutMapping("/enroll/{userId}/{courseId}")
public ResponseEntity<String> enrollUserInCourse(@PathVariable Long userId, @PathVariable Long courseId) {
    authenticationService.enrollUserInCourse(userId, courseId);
    return ResponseEntity.ok("User enrolled successfully in the course.");
}

@GetMapping("/getByEmail")
public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
    Optional<User> optionalUser = userRepository.findByEmail(email);
    if (optionalUser.isPresent()) {
        User user = optionalUser.get();
        return ResponseEntity.ok(user);
    } else {
        return ResponseEntity.notFound().build();
    }
}

}