package br.ufpr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.model.RelatorioDeConclusao;

public interface RelatorioDeConclusaoRepository extends JpaRepository<RelatorioDeConclusao, Long> {
    Optional<RelatorioDeConclusao> findById(String id);
}
