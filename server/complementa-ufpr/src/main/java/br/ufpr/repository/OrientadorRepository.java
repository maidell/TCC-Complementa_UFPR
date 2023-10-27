package br.ufpr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.model.Orientador;

public interface OrientadorRepository extends JpaRepository<Orientador, Long> {
	
	Optional<Orientador> findById(String id);
	
    Orientador findByEmail(String email);
    
    public long count();
    
}
