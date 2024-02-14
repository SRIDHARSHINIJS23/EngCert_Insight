package com.example.english_cert.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.english_cert.entity.Enquiry;
import com.example.english_cert.service.EnquiryService;

import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/enquiry")
@CrossOrigin(origins = "http://localhost:5173")
public class EnquiryApiController {

    @Autowired
    EnquiryService service;

    @PostMapping("/add")
    public Enquiry create(@RequestBody Enquiry enquiry) {
        return service.addEnquiry(enquiry);
    }

    @GetMapping("/get")
    public List<Enquiry> getAllEnquiries() {
        return service.getAllEnquiries();
    }

    @GetMapping("/get/{id}")
    public Enquiry getEnquiryById(@PathVariable Long id) {
        return service.getEnquiryById(id)
                .orElseThrow(() -> new RuntimeException("Enquiry not found with id " + id));
    }

    @PutMapping("/updateResponse/{id}")
    public ResponseEntity<?> updateEnquiryResponseById(@PathVariable Long id, @RequestBody Map<String, String> requestBody) {
        String response = requestBody.get("response");
        if (response == null) {
            return ResponseEntity.badRequest().body("Response field is required");
        }

        Optional<Enquiry> optionalEnquiry = service.getEnquiryById(id);
        if (optionalEnquiry.isPresent()) {
            Enquiry enquiry = optionalEnquiry.get();
            enquiry.setResponse(response);
            service.updateEnquiry(enquiry); // Call your update method to save the updated enquiry
            return ResponseEntity.ok(enquiry);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public boolean deleteEnquiryById(@PathVariable Long id) {
        return service.deleteEnquiryById(id);
    }

}