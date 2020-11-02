package com.dcm.boast.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dcm.boast.model.Comment;
@Repository
public interface BoastCommentRepository extends JpaRepository<Comment,Long>{

	List<Comment> findAllByBid(Long bid);
	Page<Comment> findAllByBid(Long bid, Pageable pageable);
	List<Comment> findAllByReId(long id);

}
