package br.ufpr.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

@Entity
@Table(name = "contestacao_carga_horaria")
@Inheritance(strategy = InheritanceType.JOINED)
public class ContestacaoCargaHoraria extends Contestacao{
	
	private static final long serialVersionUID = 1L;
	
	@Column(name = "carga_horaria_original")
	private double cargaHorariaOriginal;
	
	@Column(name = "carga_horaria_nova")
	private double cargaHorariaNova;

	public ContestacaoCargaHoraria() {
		super();
	}

	public ContestacaoCargaHoraria(Long id, String descricao, TipoContestacao tipoContestacao, Date dataContestacao, Status status,
			Usuario autor, Atividade atividade, double cargaHorariaOriginal, double cargaHorariaNova) {
		super(id, descricao, tipoContestacao, dataContestacao, status, autor, atividade);
		this.cargaHorariaOriginal = cargaHorariaOriginal;
		this.cargaHorariaNova = cargaHorariaNova;
	}

	public double getCargaHorariaOriginal() {
		return cargaHorariaOriginal;
	}

	public void setCargaHorariaOriginal(double cargaHorariaOriginal) {
		this.cargaHorariaOriginal = cargaHorariaOriginal;
	}

	public double getCargaHorariaNova() {
		return cargaHorariaNova;
	}

	public void setCargaHorariaNova(double cargaHorariaNova) {
		this.cargaHorariaNova = cargaHorariaNova;
	}
	
	@Override
	public String toString() {
	    return "Contestacao [id=" + getId() + "descricao=" + getDescricao() + "tipoContestacao=" + getTipoContestacao()
	    	    + "dataContestacao=" + getDataContestacao() + "status=" + getStatus() + "autor=" + getAutor()
	    	    + "atividade=" + getAtividade() + ", cargaHorariaOriginal=" + getCargaHorariaOriginal() + ", cargaHorariaNova=" + getCargaHorariaNova() + "]";
	}

	
}
