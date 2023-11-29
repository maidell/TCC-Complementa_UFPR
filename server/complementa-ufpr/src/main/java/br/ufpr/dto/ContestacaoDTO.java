package br.ufpr.dto;

import java.io.Serializable;
import java.util.Date;

import br.ufpr.model.Atividade;
import br.ufpr.model.Status;
import br.ufpr.model.TipoContestacao;
import br.ufpr.model.Usuario;

public class ContestacaoDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
    private String descricao;
    private TipoContestacao tipoContestacao;
    private Date dataContestacao;
    private Status status;
    
	public ContestacaoDTO() {
		super();
	}

	public ContestacaoDTO(Long id, String descricao, TipoContestacao tipoContestacao, Date dataContestacao, Status status) {
		super();
		this.id = id;
		this.descricao = descricao;
		this.tipoContestacao = tipoContestacao;
		this.dataContestacao = dataContestacao;
		this.status = status;
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public TipoContestacao getTipoContestacao() {
		return tipoContestacao;
	}

	public void setTipoContestacao(TipoContestacao tipoContestacao) {
		this.tipoContestacao = tipoContestacao;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Date getDataContestacao() {
		return dataContestacao;
	}

	public void setDataContestacao(Date dataContestacao) {
		this.dataContestacao = dataContestacao;
	}

	@Override
	public String toString() {
	    return "Contestacao [id=" + getId() 
	    		+ ", descricao=" + getDescricao()
	    	    + ", tipoContestacao=" + getTipoContestacao()
	    	    + ", dataContestacao=" + getDataContestacao()
	    	    + ", status=" + getStatus() + "]";
	}


}
