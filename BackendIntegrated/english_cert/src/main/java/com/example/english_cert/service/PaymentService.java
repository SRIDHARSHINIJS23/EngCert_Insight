package com.example.english_cert.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.english_cert.entity.Payment;
import com.example.english_cert.repository.PaymentRepo;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    PaymentRepo repo;

    public Payment addPayment(Payment payment) {
        return repo.save(payment);
    }

    public List<Payment> getAllPayments() {
        return repo.findAll();
    }

    public Optional<Payment> getById(Long paymentId) {
        return repo.findById(paymentId);
    }
}