package br.ufpr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.model.ServidorCoordenador;

public interface ServidorCoordenadorRepository extends JpaRepository<ServidorCoordenador, Long> {
    Optional<ServidorCoordenador> findById(String id);
    
    ServidorCoordenador findByEmail(String email);
    
    public long count();
}