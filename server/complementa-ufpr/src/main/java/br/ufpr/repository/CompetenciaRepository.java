package br.ufpr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.model.Competencia;

public interface CompetenciaRepository extends JpaRepository<Competencia, Long> {
	
	Optional<Competencia> findById(String id);
	
    public long count();
    
}
