package br.ufpr.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.ufpr.model.Projeto;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {
	
	Optional<Projeto> findById(Long id);
	
    public long count();
    
    @Query("SELECT p FROM Projeto p " +
            "WHERE p.orientador.id = :userId " +
            "OR :userId IN (SELECT a.id FROM p.alunos a) " +
            "OR :userId IN (SELECT m.id FROM p.monitores m)")
    List<Projeto> findAllByUserId(@Param("userId") Long userId);
    
}
