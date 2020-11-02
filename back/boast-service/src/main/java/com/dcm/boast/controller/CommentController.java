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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dcm.boast.intercomm.UserClient;
import com.dcm.boast.model.Comment;
import com.dcm.boast.model.CommentResponse;
import com.dcm.boast.model.CommentStar;
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
	@PostMapping()
	@ApiOperation(value = "자랑게시물 댓글작성")
	public ResponseEntity<?> insert(@RequestBody Comment comment) {

		ResponseEntity<?> entity = null;

		try {
			entity = new ResponseEntity<Comment>(commentService.insert(comment), HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return entity;
	}
	@PutMapping("/{commentId}")
	@ApiOperation(value = "수정하기")
	public ResponseEntity<?> update(@PathVariable long commentId, @RequestBody Comment comment) {

		ResponseEntity<?> entity = null;

		try {
			entity = new ResponseEntity<Comment>(commentService.update(comment,commentId), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return entity;
	}
	
	@DeleteMapping("/{commentId}")
	@ApiOperation(value = "해당 id값 삭제")
	public ResponseEntity<?> delete(@PathVariable long commentId) {
		if(commentService.findCommentById(commentId)!= null){
			commentService.delete(commentId);
			return new ResponseEntity<>(HttpStatus.OK);
		} else{
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

	}
	
	@PutMapping("/like")
	@ApiOperation(value = "좋아요 올리기")
	public ResponseEntity<?> like(@RequestBody CommentStar commentStar) {

		ResponseEntity<?> entity = null;

		try {
			entity = new ResponseEntity<Comment>(commentService.like(commentStar), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return entity;
	}
	
	@PutMapping("/dislike")
	@ApiOperation(value = "좋아요 취소")
	public ResponseEntity<?> dislike(@RequestBody CommentStar commentStar) {

		ResponseEntity<?> entity = null;

		try {
			entity = new ResponseEntity<Comment>(commentService.dislike(commentStar), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return entity;
	}
}
