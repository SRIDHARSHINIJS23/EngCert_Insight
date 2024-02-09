package com.example.english_cert.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.english_cert.entity.Enquiry;
import com.example.english_cert.service.EnquiryService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/enquiry")
public class EnquiryApiController {

    @Autowired
    EnquiryService service;

    @PostMapping("/add")
    public boolean create(@RequestBody Enquiry enquiry) {
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

    @PostMapping("/update/{id}")
    public Enquiry updateEnquiryById(@PathVariable Long id, @RequestBody Enquiry updatedEnquiry) {
        return service.updateEnquiryById(id, updatedEnquiry);
    }

    @DeleteMapping("/delete/{id}")
    public boolean deleteEnquiryById(@PathVariable Long id) {
        return service.deleteEnquiryById(id);
    }
}