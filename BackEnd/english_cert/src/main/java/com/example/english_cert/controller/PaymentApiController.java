package com.example.english_cert.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.english_cert.entity.Payment;
import com.example.english_cert.service.PaymentService;

import java.util.List;

@RestController
@RequestMapping("/payment")
public class PaymentApiController {

    @Autowired
    PaymentService service;

    @PostMapping("/add")
    public Payment addPayment(@RequestBody Payment payment) {
        return service.addPayment(payment);
    }

    @GetMapping("/get")
    public List<Payment> getAllPayments() {
        return service.getAllPayments();
    }

    @GetMapping("/get/{id}")
    public Payment getById(@PathVariable Long id) {
        return service.getById(id)
                     .orElseThrow(() -> new RuntimeException("Payment not found with id " + id));
    }
}