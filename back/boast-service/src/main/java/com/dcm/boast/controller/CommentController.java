package com.dcm.boast.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.dcm.boast.intercomm.UserClient;
import com.dcm.boast.model.Comment;
import com.dcm.boast.model.CommentResponse;
import com.dcm.boast.service.CommentService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController("/comment")
public class CommentController {
	@Autowired
	private CommentService commentService;
	@Autowired
    private UserClient userClient;
	@GetMapping("/all/{boastId}")
	@ApiOperation(value = "해당 자랑게시물의 모든 댓글 반환")
	public ResponseEntity<List<CommentResponse>> findAll(@PathVariable long boastId,@PageableDefault(size=10, sort="createdate",direction = Sort.Direction.DESC)Pageable pageable) {
		Page<Comment> commentlist = commentService.allComments(boastId,pageable);
		List<CommentResponse> list = new ArrayList<>();
		for (Comment comment : commentlist) {
			CommentResponse commentResponse = new CommentResponse(comment,userClient.getUserName(comment.getUserId()));
			if(commentService.isLike(comment.getId())) commentResponse.setIslike(true); //내가 좋아요 누른 댓글인지
			List<Comment> reclist = commentService.findReCommentById(comment.getId()); //대댓글 리스트
			commentResponse.setRecomment(reclist);
			list.add(commentResponse);
		}
		if(list != null) return new ResponseEntity<>(list, HttpStatus.OK);
		else	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
}
