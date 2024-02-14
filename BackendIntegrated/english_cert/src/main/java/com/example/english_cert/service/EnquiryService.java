package com.example.english_cert.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.english_cert.entity.Enquiry;
import com.example.english_cert.repository.EnquiryRepo;

@Service
public class EnquiryService {

    @Autowired
    EnquiryRepo repo;

    public Enquiry addEnquiry(Enquiry enquiry) {
        return repo.save(enquiry);
    }

    public List<Enquiry> getAllEnquiries() {
        return repo.findAll();
    }

    public Optional<Enquiry> getEnquiryById(Long enquiryId) {
        return repo.findById(enquiryId);
    }

    public Enquiry updateEnquiryResponseById(Long enquiryId, String response) {
        return repo.findById(enquiryId).map(enquiry -> {
            enquiry.setResponse(response);
            return repo.save(enquiry);
        }).orElse(null);
    }

    public ResponseEntity<?> updateEnquiry(Enquiry updatedEnquiry) {
        try {
            Enquiry savedEnquiry = repo.save(updatedEnquiry);
            return ResponseEntity.ok(savedEnquiry);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update enquiry: " + e.getMessage());
        }
    }

    public boolean deleteEnquiryById(Long enquiryId) {
        repo.deleteById(enquiryId);
        return true;
    }

}