package com.chimi.repository;

import java.util.List;

import javax.transaction.Transactional;

import com.chimi.model.ChimiComment;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentReopository extends CrudRepository<ChimiComment, Long> {

    List<ChimiComment> findByHid(long hid);
    
	@Transactional
    void deleteByHid(Long postid);
}