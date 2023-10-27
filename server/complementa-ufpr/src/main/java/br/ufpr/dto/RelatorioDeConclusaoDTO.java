package br.ufpr.dto;

import java.io.Serializable;
import java.util.List;

public class RelatorioDeConclusaoDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String descricao;
    private List<AnexoDTO> anexos;

    public RelatorioDeConclusaoDTO() {
    }

    public RelatorioDeConclusaoDTO(Long id, String descricao, List<AnexoDTO> anexos) {
        this.id = id;
        this.descricao = descricao;
        this.anexos = anexos;
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

    public List<AnexoDTO> getAnexos() {
        return anexos;
    }

    public void setAnexos(List<AnexoDTO> anexos) {
        this.anexos = anexos;
    }

    @Override
    public String toString() {
        return "RelatorioDeConclusaoDTO [id=" + id + ", descricao=" + descricao + ", anexos=" + anexos + "]";
    }
}
