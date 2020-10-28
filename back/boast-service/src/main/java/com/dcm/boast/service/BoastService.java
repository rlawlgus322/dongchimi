package com.dcm.boast.service;

import java.util.List;

import com.dcm.boast.model.Boast;

public interface BoastService {
	List<Boast> allBoasts();
  Boast findBoastById(long boastId);
  void delete(long boastId);
  void insert(Boast boast);
  void update(Boast boast, long id);
}
