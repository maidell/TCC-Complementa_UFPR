package br.ufpr.dto;

import java.io.Serializable;

public class ComplexidadeDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String nome;
    private int cargaHorariaMinima;
    private int cargaHorariaMaxima;

    public ComplexidadeDTO() {
    }

    public ComplexidadeDTO(Long id, String nome, int cargaHorariaMinima, int cargaHorariaMaxima) {
        this.id = id;
        this.nome = nome;
        this.cargaHorariaMinima = cargaHorariaMinima;
        this.cargaHorariaMaxima = cargaHorariaMaxima;
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

    public int getCargaHorariaMinima() {
        return cargaHorariaMinima;
    }

    public void setCargaHorariaMinima(int cargaHorariaMinima) {
        this.cargaHorariaMinima = cargaHorariaMinima;
    }

    public int getCargaHorariaMaxima() {
        return cargaHorariaMaxima;
    }

    public void setCargaHorariaMaxima(int cargaHorariaMaxima) {
        this.cargaHorariaMaxima = cargaHorariaMaxima;
    }

    @Override
    public String toString() {
        return "ComplexidadeDTO [id=" + getId() + ", nome=" + getNome() + ", cargaHorariaMinima=" + getCargaHorariaMinima() +
                ", cargaHorariaMaxima=" + getCargaHorariaMaxima() + "]";
    }

}
