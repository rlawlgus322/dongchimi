package com.dcm.boast.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dcm.boast.model.CommentStar;
import com.dcm.boast.model.PKSet;
@Repository
public interface BoastCommentStarRepository extends JpaRepository<CommentStar,PKSet>{

}
