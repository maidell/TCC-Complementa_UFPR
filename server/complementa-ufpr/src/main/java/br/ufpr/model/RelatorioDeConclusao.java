package br.ufpr.model;

import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "RelatorioDeConclusao")
public class RelatorioDeConclusao implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    
    @Column(name = "descricao")
    private String descricao;

    @OneToMany(mappedBy = "relatorioDeConclusao", fetch = FetchType.LAZY)
    private List<Anexo> anexos;
    
    public RelatorioDeConclusao() {
		super();
	}
    
	public RelatorioDeConclusao(Long id) {
		super();
		this.id = id;
	}

	public RelatorioDeConclusao(Long id, String descricao, List<Anexo> anexos) {
		super();
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

	public List<Anexo> getAnexos() {
		return anexos;
	}

	public void setAnexos(List<Anexo> anexos) {
		this.anexos = anexos;
	}

    @Override
    public String toString() {
        return "RelatorioDeConclusao [id=" + id + ", descricao=" + descricao + ", anexos=" + anexos + "]";
    }
}
