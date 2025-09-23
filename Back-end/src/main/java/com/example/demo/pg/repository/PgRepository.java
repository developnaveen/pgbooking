package com.example.demo.pg.repository;

import com.example.demo.pg.model.Pg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PgRepository extends JpaRepository<Pg, Integer> {
    // You can add custom queries if needed
}
