package com.example.english_cert.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.english_cert.entity.Enquiry;
import com.example.english_cert.repository.EnquiryRepo;

@Service
public class EnquiryService {

    @Autowired
    EnquiryRepo repo;

    public boolean addEnquiry(Enquiry enquiry) {
        repo.save(enquiry);
        return true;
    }

    public List<Enquiry> getAllEnquiries() {
        return repo.findAll();
    }

    public Optional<Enquiry> getEnquiryById(Long enquiryId) {
        return repo.findById(enquiryId);
    }

    public Enquiry updateEnquiryById(Long enquiryId, Enquiry updatedEnquiry) {
        return repo.findById(enquiryId).map(enquiry -> {
            enquiry.setEnquiryDate(updatedEnquiry.getEnquiryDate());
            enquiry.setTitle(updatedEnquiry.getTitle());
            enquiry.setDescription(updatedEnquiry.getDescription());
            enquiry.setEmail(updatedEnquiry.getEmail());
            enquiry.setEnquiryType(updatedEnquiry.getEnquiryType());
            enquiry.setStudent(updatedEnquiry.getStudent());
            enquiry.setCourse(updatedEnquiry.getCourse());
            return repo.save(enquiry);
        }).orElse(null);
    }

    public boolean deleteEnquiryById(Long enquiryId) {
        repo.deleteById(enquiryId);
        return true;
    }
}