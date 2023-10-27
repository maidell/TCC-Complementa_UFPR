package br.ufpr.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import br.ufpr.model.Anexo;

public interface AnexoRepository extends JpaRepository<Anexo, Long> {
	
	public Optional<Anexo> findById(String id);

}
