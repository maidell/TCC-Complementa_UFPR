package br.ufpr.dto;

public class CompetenciaDTO {
    private Long id;
    private String nome;

    public CompetenciaDTO() {
    }

    public CompetenciaDTO(Long id, String nome) {
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

    @Override
    public String toString() {
        return "Competencia [id=" + getId() + ", nome=" + getNome() + "]";
    }

}

