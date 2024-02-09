package com.example.english_cert.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.english_cert.entity.Payment;

@Repository
public interface PaymentRepo extends JpaRepository<Payment,Long>{

}