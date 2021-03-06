package com.chimi.service;

import java.util.List;
import java.util.Optional;

import com.chimi.model.CommentLike;
import com.chimi.model.PKSet;
import com.chimi.repository.LikeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeServiceImpl implements LikeService {

  @Autowired
  LikeRepository likeRepository;

  @Override
  public CommentLike save(CommentLike like) {
    return likeRepository.save(like);
  }

  @Override
  public void deleteById(PKSet pk) {
    likeRepository.deleteById(pk);
  }

  @Override
  public Optional<CommentLike> findById(PKSet pk) {
    return likeRepository.findById(pk);
  }

  @Override
  public List<CommentLike> findByLikePKId(long cid) {
    return likeRepository.findAllByLikePKChimiId(cid);
  }

  @Override
  public void deleteByLikePKId(long cid) {
    likeRepository.deleteByLikePK_ChimiId(cid);
  }
  
}
