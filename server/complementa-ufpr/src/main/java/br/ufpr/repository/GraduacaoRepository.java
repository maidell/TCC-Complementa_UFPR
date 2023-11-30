package br.ufpr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.ufpr.model.Graduacao;

public interface GraduacaoRepository extends JpaRepository<Graduacao, Long> {
	
	Optional<Graduacao> findById(Long id);
	
    public long count();
    
    @Query("SELECT g FROM Graduacao g WHERE g.coordenador.id = :coordenadorId")
    Optional<Graduacao> findByCoordenadorId(@Param("coordenadorId") Long coordenadorId);

}
