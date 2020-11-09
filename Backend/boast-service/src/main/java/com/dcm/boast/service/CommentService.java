package com.dcm.boast.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dcm.boast.model.Boast;
import com.dcm.boast.model.Comment;
import com.dcm.boast.model.CommentStar;

public interface CommentService {

	Page<Comment> allComments(long boastId, Pageable pageable);

	Comment findCommentById(long id);

	Comment like(CommentStar commentStar);

	Comment dislike(CommentStar commentStar);

	boolean isLike(long cid, long userId);

	Comment insert(Comment comment);

	Comment update(Comment comment, long id);

	void delete(long id);

	List<Comment> findReCommentById(long id);

}
