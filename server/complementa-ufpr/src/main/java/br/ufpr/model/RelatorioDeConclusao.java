package br.ufpr.model;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "RelatorioDeConclusao")
public class RelatorioDeConclusao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    
    @Column(name = "descricao")
    private String descricao;

    @OneToMany(mappedBy = "relatorioDeConclusao", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Anexo> anexos;

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
