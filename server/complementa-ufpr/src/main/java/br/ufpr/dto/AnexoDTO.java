package br.ufpr.dto;

import java.io.Serializable;

public class AnexoDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String fileName;
    private String filePath;
    private String fileType;
    
    public AnexoDTO() {
        super();
    }

    public AnexoDTO(Long id, String fileName, String filePath, String fileType, AtividadeDTO atividade, RelatorioDeConclusaoDTO relatorioDeConclusao) {
        super();
        this.id = id;
        this.fileName = fileName;
        this.filePath = filePath;
        this.fileType = fileType;
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
    
    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    @Override
    public String toString() {
        return "Anexo [id=" + getId() + ", fileName=" + getFileName() + ", filePath=" + getFilePath() + ", fileType=" + getFileType() + "]";
    }
}
