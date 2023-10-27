package br.ufpr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.model.Atividade;

public interface AtividadeRepository extends JpaRepository<Atividade, Long> {
	
	Optional<Atividade> findById(String id);
	
    public long count();
    
}
