package br.ufpr.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

	Optional<Usuario> findById(Long id);
	
	Optional<Usuario> findByEmail(String email);
	
	public long count();

}
