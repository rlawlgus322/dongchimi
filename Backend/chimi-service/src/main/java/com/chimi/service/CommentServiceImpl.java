package com.chimi.service;

import java.util.List;
import java.util.Optional;

import com.chimi.model.ChimiComment;
import com.chimi.repository.CommentReopository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentReopository commentRopository;

    @Override
    public ChimiComment save(ChimiComment comment) {
        return commentRopository.save(comment);
    }

    @Override
    public List<ChimiComment> findByHid(long hid) {
        return commentRopository.findByHid(hid);
    }

    @Override
    public void deleteById(long id) {
        commentRopository.deleteById(id);
    }

    @Override
    public void deleteByHid(long hid) {
        commentRopository.deleteByHid(hid);
    }

    @Override
    public Optional<ChimiComment> findById(long cid) {
        return commentRopository.findById(cid);
    }

}