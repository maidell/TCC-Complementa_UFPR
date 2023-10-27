package br.ufpr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.model.ContestacaoCargaHoraria;

public interface ContestacaoCargaHorariaRepository extends JpaRepository<ContestacaoCargaHoraria, Long> {
    Optional<ContestacaoCargaHoraria> findById(String id);
}