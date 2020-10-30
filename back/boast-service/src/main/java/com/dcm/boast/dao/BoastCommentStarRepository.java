package com.dcm.boast.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dcm.boast.model.CommentStar;

public interface BoastCommentStarRepository extends JpaRepository<CommentStar,Long>{

}
