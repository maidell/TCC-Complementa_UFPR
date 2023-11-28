package br.ufpr.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.ufpr.model.Orientador;

public interface OrientadorRepository extends JpaRepository<Orientador, Long> {
	
	Optional<Orientador> findById(Long id);
	
    Orientador findByEmail(String email);
    
    public long count();

    @Query("SELECT o FROM Orientador o WHERE o.graduacao.id = :graduacaoId")
    List<Orientador> findAllByGraduacaoId(@Param("graduacaoId") Long graduacaoId);
}
