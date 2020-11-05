package com.chimi.service;

import java.util.List;
import java.util.Optional;

import com.chimi.model.ChimiComment;


public interface CommentService {
    ChimiComment save(ChimiComment comment);
    Optional<ChimiComment> findById(Long cid);
    List<ChimiComment> findByHid(Long hid);
    void deleteById(Long cid);
    void deleteByHid(Long hid);
}