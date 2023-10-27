package br.ufpr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.model.Complexidade;

public interface ComplexidadeRepository extends JpaRepository<Complexidade, Long> {
	
	Optional<Complexidade> findById(String id);
	
    public long count();
    
}
