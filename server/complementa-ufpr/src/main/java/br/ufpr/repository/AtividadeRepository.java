package br.ufpr.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.model.Atividade;
import br.ufpr.model.Projeto;

public interface AtividadeRepository extends JpaRepository<Atividade, Long> {
	
	Optional<Atividade> findById(String id);
	
	List<Atividade> findAllByProjeto(Projeto projeto);
	
    public long count();
    
}
