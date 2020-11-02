package com.dcm.boast.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.dcm.boast.model.Comment;

public interface BoastCommentRepository extends JpaRepository<Comment,Long>{

	List<Comment> findAllByBid(Long bid);
	Page<Comment> findAllByBid(Long bid, Pageable pageable);
	List<Comment> findAllByReId(long id);

}
