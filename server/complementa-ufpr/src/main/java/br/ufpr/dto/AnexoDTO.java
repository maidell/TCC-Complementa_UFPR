package br.ufpr.dto;

import java.io.Serializable;

public class AnexoDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String fileName;
    private String filePath;
    private AtividadeDTO atividade;
    private RelatorioDeConclusaoDTO relatorioDeConclusao;

    public AnexoDTO() {
        super();
    }

    public AnexoDTO(Long id, String fileName, String filePath, AtividadeDTO atividade, RelatorioDeConclusaoDTO relatorioDeConclusao) {
        super();
        this.id = id;
        this.fileName = fileName;
        this.filePath = filePath;
        this.atividade = atividade;
        this.relatorioDeConclusao = relatorioDeConclusao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public AtividadeDTO getAtividade() {
        return atividade;
    }

    public void setAtividade(AtividadeDTO atividade) {
        this.atividade = atividade;
    }

    public RelatorioDeConclusaoDTO getRelatorioDeConclusao() {
        return relatorioDeConclusao;
    }

    public void setRelatorioDeConclusao(RelatorioDeConclusaoDTO relatorioDeConclusao) {
        this.relatorioDeConclusao = relatorioDeConclusao;
    }

    @Override
    public String toString() {
        return "AnexoDTO [id=" + id + ", fileName=" + fileName + ", filePath=" + filePath + ", atividade=" + atividade + ", relatorioDeConclusao=" + relatorioDeConclusao + "]";
    }
}
