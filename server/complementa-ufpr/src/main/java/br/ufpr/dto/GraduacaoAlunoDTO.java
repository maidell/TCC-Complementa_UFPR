package br.ufpr.dto;

import java.io.Serializable;
import java.util.List;

public class GraduacaoAlunoDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String nome;
    
    public GraduacaoAlunoDTO() {
    }

    public GraduacaoAlunoDTO(Long id, String nome, OrientadorDTO coordenador) {
        this.id = id;
        this.nome = nome;
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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
    
    @Override
    public String toString() {
        return "GraduacaoDTO [id=" + getId() + ", nome=" + getNome() + "]";
    }

}
