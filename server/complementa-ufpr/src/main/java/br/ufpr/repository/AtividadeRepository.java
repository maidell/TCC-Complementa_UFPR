package br.ufpr.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.ufpr.model.Aluno;
import br.ufpr.model.Atividade;
import br.ufpr.model.Graduacao;
import br.ufpr.model.Projeto;
import br.ufpr.model.Usuario;

public interface AtividadeRepository extends JpaRepository<Atividade, Long> {

	Optional<Atividade> findById(String id);

	List<Atividade> findAllByProjeto(Projeto projeto);

	List<Atividade> findAllByExecutor(Aluno executor);

	List<Atividade> findAllByAutor(Usuario autor);

	public long count();

	@Query("SELECT a FROM Atividade a " + "JOIN a.graduacoes g " + "WHERE g = :graduacao")
	List<Atividade> findAllByGraduacao(@Param("graduacao") Graduacao graduacao);

	@Query("SELECT a FROM Atividade a WHERE a.projeto.orientador.id = :orientadorId")
	List<Atividade> findAllByOrientadorId(@Param("orientadorId") Long orientadorId);
	
	@Query("SELECT a FROM Atividade a WHERE contestacaoCargaHoraria IS NOT NULL AND a.executor.graduacao.coordenador.id = :coordenadorId")
	List<Atividade> findAllContestacaoCargaHorariaByCoordenadorId(@Param("coordenadorId") Long coordenadorId);
	
	@Query("SELECT a FROM Atividade a WHERE contestacao IS NOT NULL AND a.executor.graduacao.coordenador.id = :coordenadorId")
	List<Atividade> findAllContestacaoByCoordenadorId(@Param("coordenadorId") Long coordenadorId);
	
	@Query("SELECT a FROM Atividade a WHERE a.contestacaoCargaHoraria IS NOT NULL AND :servidorId IN (SELECT s.id FROM a.executor.graduacao.servidoresCoordenadores s)")
	List<Atividade> findAllContestacaoCargaHorariaByServidorId(@Param("servidorId") Long servidorId);

	@Query("SELECT a FROM Atividade a WHERE a.contestacao IS NOT NULL AND :servidorId IN (SELECT s.id FROM a.executor.graduacao.servidoresCoordenadores s)")
	List<Atividade> findAllContestacaoByServidorId(@Param("servidorId") Long servidorId);
	
	
}
