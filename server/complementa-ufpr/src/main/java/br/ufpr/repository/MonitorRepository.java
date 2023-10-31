package br.ufpr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.model.Monitor;

public interface MonitorRepository extends JpaRepository<Monitor, Long> {
	
	Optional<Monitor> findById(String id);
	
    Monitor findByEmail(String email);
    
    public long count();
    
}
