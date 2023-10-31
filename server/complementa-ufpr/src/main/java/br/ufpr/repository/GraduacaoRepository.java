package br.ufpr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.model.Graduacao;

public interface GraduacaoRepository extends JpaRepository<Graduacao, Long> {
	
	Optional<Graduacao> findById(String id);
	
    public long count();
    
}
