package com.dcm.boast.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dcm.boast.model.BoastStar;
@Repository
public interface BoastStarRepository extends JpaRepository<BoastStar,Long>{

}
