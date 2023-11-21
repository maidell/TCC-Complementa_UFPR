package br.ufpr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.model.Coordenador;

public interface CoordenadorRepository extends JpaRepository<Coordenador, Long> {
	
	Optional<Coordenador> findById(String id);
	
	Optional<Coordenador> findOptByEmail(String email);
	
    Coordenador findByEmail(String email);
    
    public long count();
    
}
