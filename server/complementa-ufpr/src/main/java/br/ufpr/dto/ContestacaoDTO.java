package br.ufpr.dto;

import java.io.Serializable;

public class ContestacaoDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
    private Long id;
    private String descricao;

	public ContestacaoDTO() {
	}

	public ContestacaoDTO(Long id, String descricao) {
		this.id = id;
		this.descricao = descricao;
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
    
	@Override
	public String toString() {
	    return "ContestacaoDTO [id=" + id + ", descricao=" + descricao + "]";
	}

}
