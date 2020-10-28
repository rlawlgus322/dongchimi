package com.dcm.boast.service;

import java.util.List;

import com.dcm.boast.model.Boast;

public interface BoastService {
	List<Boast> allBoasts();
  Boast findBoastById(long boastId);
  void delete(long boastId);
  Boast insert(Boast boast);
  Boast update(Boast boast, long id);
}
