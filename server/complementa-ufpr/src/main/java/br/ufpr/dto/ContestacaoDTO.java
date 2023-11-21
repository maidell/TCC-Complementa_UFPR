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
    private Usuario autor;
    private Atividade atividade;

	public ContestacaoDTO() {
		super();
	}

	public ContestacaoDTO(Long id, String descricao, TipoContestacao tipoContestacao, Date dataContestacao, Status status,
			Usuario autor, Atividade atividade) {
		super();
		this.id = id;
		this.descricao = descricao;
		this.tipoContestacao = tipoContestacao;
		this.dataContestacao = dataContestacao;
		this.status = status;
		this.autor = autor;
		this.atividade = atividade;
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

	public Usuario getAutor() {
		return autor;
	}

	public void setAutor(Usuario autor) {
		this.autor = autor;
	}

	public Date getDataContestacao() {
		return dataContestacao;
	}

	public void setDataContestacao(Date dataContestacao) {
		this.dataContestacao = dataContestacao;
	}

	public Atividade getAtividade() {
		return atividade;
	}

	public void setAtividade(Atividade atividade) {
		this.atividade = atividade;
	}

	@Override
	public String toString() {
	    return "Contestacao [id=" + id 
	    		+ "descricao=" + descricao
	    	    + "tipoContestacao=" + tipoContestacao
	    	    + "dataContestacao=" + dataContestacao
	    	    + "status=" + status
	    	    + "autor=" + autor
	    	    + "atividade=" + atividade + "]";
	}


}
