package br.ufpr.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;
import javax.persistence.Column;

@Entity
@Table(name = "anexo")
public class Anexo implements Serializable {

    private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name = "fileName")
	private String fileName;
	
    @Column(name = "filePath")
	private String filePath;
    
    @Column(name = "fileType")
	private String fileType;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atividade_id")
    private Atividade atividade;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "relatorio_de_conclusao")
    private RelatorioDeConclusao relatorioDeConclusao;

	public Anexo() {
		super();
	}

	public Anexo(Long id, String fileName, String filePath, String fileType, Atividade atividade, RelatorioDeConclusao relatorioDeConclusao) {
		super();
		this.id = id;
		this.fileName = fileName;
		this.filePath = filePath;
		this.fileType = fileType;
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
	
	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Atividade getAtividade() {
		return atividade;
	}

	public void setAtividade(Atividade atividade) {
		this.atividade = atividade;
	}

	public RelatorioDeConclusao getRelatorioDeConclusao() {
		return relatorioDeConclusao;
	}

	public void setRelatorioDeConclusao(RelatorioDeConclusao relatorioDeConclusao) {
		this.relatorioDeConclusao = relatorioDeConclusao;
	}

	@Override
	public String toString() {
	    return "Anexo [id=" + getId() + ", fileName=" + getFileName() + ", filePath=" + getFilePath() + ", fileType=" + getFileType() + ", atividade=" + getAtividade() + ", relatorioDeConclusao=" + getRelatorioDeConclusao() + "]";
	}
    
}
