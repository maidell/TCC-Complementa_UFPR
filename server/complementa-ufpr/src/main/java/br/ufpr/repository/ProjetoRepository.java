package br.ufpr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.model.Projeto;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {
	
	Optional<Projeto> findById(String id);
	
    public long count();
    
}
