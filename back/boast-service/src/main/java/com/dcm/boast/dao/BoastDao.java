package com.dcm.boast.dao;

import com.dcm.boast.model.Boast;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BoastDao extends JpaRepository<Boast, Long> {
}
