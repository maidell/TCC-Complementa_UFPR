package br.ufpr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.model.Contestacao;

public interface ContestacaoRepository extends JpaRepository<Contestacao, Long> {
    Optional<Contestacao> findById(String id);
    
    
    

}