package com.chimi.service;

import java.util.List;
import java.util.Optional;

import com.chimi.model.ChimiComment;


public interface CommentService {
    ChimiComment save(ChimiComment comment);
    Optional<ChimiComment> findById(long cid);
    List<ChimiComment> findByHid(long hid);
    void deleteById(long cid);
    void deleteByHid(long hid);
}