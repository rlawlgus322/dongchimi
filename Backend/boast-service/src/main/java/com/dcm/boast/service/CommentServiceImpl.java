package com.dcm.boast.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.dcm.boast.dao.BoastCommentRepository;
import com.dcm.boast.dao.BoastCommentStarRepository;
import com.dcm.boast.model.Comment;
import com.dcm.boast.model.CommentStar;
import com.dcm.boast.model.PKSet;

@Service
public class CommentServiceImpl implements CommentService{
	@Autowired
	BoastCommentRepository boastCommentRepository;
	@Autowired
	BoastCommentStarRepository boastCommentStarRepository;
	@Override
	public Page<Comment> allComments(long boastId, Pageable pageable) {
		return boastCommentRepository.findAllByBid(boastId,pageable);
	}
	
	@Override
	public Comment findCommentById(long id) {
		return boastCommentRepository.findById(id).orElse(null);
	}
	
	@Override
	public List<Comment> findReCommentById(long id) { //내 댓글을 참조한 모든 댓글들 가져오기
		return boastCommentRepository.findAllByReId(id);
	}
	@Override
	public Comment insert(Comment comment) {
		return boastCommentRepository.save(comment);
	}

	@Override
	public Comment update(Comment comment, long id){
		Comment ncomment = this.findCommentById(id);
		ncomment.setContent(comment.getContent());
		return boastCommentRepository.save(ncomment);
	}
	@Override
	public void delete(long id) {
		boastCommentRepository.deleteById(id);
		//연쇄로 지울거 cascade걸어줘야됨
		//만약 cascade로 지울거거나 원댓글지워도 대댓글은 남아진다면 삭제해도되는부분!
		List<Comment> list = boastCommentRepository.findAllByReId(id);
		for (Comment comment : list) {
			boastCommentRepository.deleteById(comment.getId());
		}
	}
	
	@Override
	public Comment like(CommentStar commentStar) {
		Comment ncomment = this.findCommentById(commentStar.getStarPK().getId());
		ncomment.setLikes(ncomment.getLikes()+1);
		boastCommentStarRepository.save(commentStar); //좋아요 테이블에 추가
		return boastCommentRepository.save(ncomment);
	}

	@Override
	public Comment dislike(CommentStar commentStar) {
		Comment comment = this.findCommentById(commentStar.getStarPK().getId());
		comment.setLikes(comment.getLikes()-1);
		boastCommentStarRepository.delete(commentStar); //좋아요 테이블에 삭제
		return boastCommentRepository.save(comment);
	}
	@Override
	public boolean isLike(long cid, long uid) {
		Optional<CommentStar> commentStar =boastCommentStarRepository.findById(new PKSet(uid,cid));
		if(commentStar.isPresent()) return true;
		else return false;
	}
}
