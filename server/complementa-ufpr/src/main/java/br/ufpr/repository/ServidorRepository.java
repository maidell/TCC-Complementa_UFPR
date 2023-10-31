package br.ufpr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.model.Servidor;

public interface ServidorRepository extends JpaRepository<Servidor, Long> {
	
	Optional<Servidor> findById(String id);
	
    Servidor findByEmail(String email);
    
    public long count();
    
}
