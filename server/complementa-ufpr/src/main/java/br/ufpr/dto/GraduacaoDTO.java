package br.ufpr.dto;

import java.io.Serializable;
import java.util.List;

public class GraduacaoDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String nome;
    private CoordenadorDTO coordenador;
    private List<CompetenciaDTO> competencias;

    public GraduacaoDTO() {
    }

    public GraduacaoDTO(Long id, String nome, CoordenadorDTO coordenador, List<CompetenciaDTO> competencias) {
        this.id = id;
        this.nome = nome;
        this.coordenador = coordenador;
        this.competencias = competencias;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public CoordenadorDTO getCoordenador() {
        return coordenador;
    }

    public void setCoordenador(CoordenadorDTO coordenador) {
        this.coordenador = coordenador;
    }

    public List<CompetenciaDTO> getCompetencias() {
        return competencias;
    }

    public void setCompetencias(List<CompetenciaDTO> competencias) {
        this.competencias = competencias;
    }
    
    @Override
    public String toString() {
        return "GraduacaoDTO [id=" + getId() + ", nome=" + getNome() + ", coordenador=" + getCoordenador() +
                ", competencias=" + getCompetencias() + "]";
    }

}
