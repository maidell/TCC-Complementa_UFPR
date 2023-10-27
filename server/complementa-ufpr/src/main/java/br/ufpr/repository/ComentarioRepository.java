package br.ufpr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.model.Comentario;

public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
	
	Optional<Comentario> findById(String id);

	public long count();
    
}
