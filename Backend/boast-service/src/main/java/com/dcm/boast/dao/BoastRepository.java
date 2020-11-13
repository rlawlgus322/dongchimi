package com.dcm.boast.dao;

import com.dcm.boast.model.Boast;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface BoastRepository extends JpaRepository<Boast, Long> {
}
