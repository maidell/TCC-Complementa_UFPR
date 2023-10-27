package br.ufpr.model;

import javax.persistence.Entity;
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
    
    @ManyToOne
    @JoinColumn(name = "atividade_id", nullable = false)
    private Atividade atividade;
    
    @ManyToOne
    @JoinColumn(name = "relatorio_de_conclusao", nullable = false)
    private RelatorioDeConclusao relatorioDeConclusao;

	public Anexo() {
		super();
	}

	public Anexo(Long id, String fileName, String filePath, Atividade atividade, RelatorioDeConclusao relatorioDeConclusao) {
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
	    return "Anexo [id=" + id + ", fileName=" + fileName + ", filePath=" + filePath + ", atividade=" + atividade + ", relatorioDeConclusao=" + relatorioDeConclusao + "]";
	}
    
}
