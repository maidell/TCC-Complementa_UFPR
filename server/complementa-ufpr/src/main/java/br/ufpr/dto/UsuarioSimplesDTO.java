package br.ufpr.dto;

import java.io.Serializable;

public class UsuarioSimplesDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String nome;

	public UsuarioSimplesDTO(Long id, String nome) {
		this.id = id;
		this.nome = nome;
	}

	public UsuarioSimplesDTO() {
		super();
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}
	
	public void setNome(String nome) {
		this.nome = nome;
	}

	@Override
	public String toString() {
		return "Usuario [id=" + id + ", nome=" + nome + "]";
	}
}
