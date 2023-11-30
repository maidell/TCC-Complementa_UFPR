package br.ufpr.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "contestacao_carga_horaria")
@Inheritance(strategy = InheritanceType.JOINED)
public class ContestacaoCargaHoraria extends Contestacao{
	
	private static final long serialVersionUID = 1L;
	
	@Column(name = "carga_horaria_original")
	private Integer cargaHorariaOriginal;
	
	@Column(name = "carga_horaria_nova")
	private Integer cargaHorariaNova;

	public ContestacaoCargaHoraria() {
		super();
	}

	public ContestacaoCargaHoraria(Long id, String descricao, TipoContestacao tipoContestacao, Date dataContestacao, Status status,
			Usuario autor, Integer cargaHorariaOriginal, Integer cargaHorariaNova) {
		super(id, descricao, tipoContestacao, dataContestacao, status, autor);
		this.cargaHorariaOriginal = cargaHorariaOriginal;
		this.cargaHorariaNova = cargaHorariaNova;
	}

	public Integer getCargaHorariaOriginal() {
		return cargaHorariaOriginal;
	}

	public void setCargaHorariaOriginal(Integer cargaHorariaOriginal) {
		this.cargaHorariaOriginal = cargaHorariaOriginal;
	}

	public Integer getCargaHorariaNova() {
		return cargaHorariaNova;
	}

	public void setCargaHorariaNova(Integer cargaHorariaNova) {
		this.cargaHorariaNova = cargaHorariaNova;
	}
	
	@Override
	public String toString() {
	    return "Contestacao [id=" + getId() 
	    		+ ", descricao=" + getDescricao() 
	    		+ ", tipoContestacao=" + getTipoContestacao()
	    	    + ", dataContestacao=" + getDataContestacao() 
	    	    + ", status=" + getStatus() 
	    	    + ", autor=" + getAutor()
	    	    + ", cargaHorariaOriginal=" + getCargaHorariaOriginal() 
	    	    + ", cargaHorariaNova=" + getCargaHorariaNova() + "]";
	}

	
}
