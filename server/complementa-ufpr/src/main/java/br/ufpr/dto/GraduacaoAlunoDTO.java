package br.ufpr.dto;

import java.io.Serializable;
import java.util.List;

public class GraduacaoAlunoDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String nome;
    private List<CompetenciaDTO> competencias;

    public GraduacaoAlunoDTO() {
    }

    public GraduacaoAlunoDTO(Long id, String nome, OrientadorDTO coordenador, List<CompetenciaDTO> competencias) {
        this.id = id;
        this.nome = nome;
        this.competencias = competencias;
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

	public List<CompetenciaDTO> getCompetencias() {
        return competencias;
    }

    public void setCompetencias(List<CompetenciaDTO> competencias) {
        this.competencias = competencias;
    }
    
    @Override
    public String toString() {
        return "GraduacaoDTO [id=" + getId() + ", nome=" + getNome() +
        		", competencias=" + getCompetencias() + "]";
    }

}
