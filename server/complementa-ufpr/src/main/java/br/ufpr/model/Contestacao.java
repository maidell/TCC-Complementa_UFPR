package br.ufpr.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "contestacao")
@Inheritance(strategy = InheritanceType.JOINED)
public class Contestacao implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "descricao")
    private String descricao;
    
    @Column(name = "tipo_contestacao")
    private TipoContestacao tipoContestacao;
    
    @Column(name = "data_contestacao")
    private Date dataContestacao;
    
    @Column(name = "status")
    private Status status;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario")
    private Usuario autor;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "atividade_id") // Certifique-se de que este é o nome da coluna correta para a chave estrangeira
    private Atividade atividade;

	public Contestacao() {
		super();
	}

	public Contestacao(Long id, String descricao, TipoContestacao tipoContestacao, Date dataContestacao, Status status,
			Usuario autor, Atividade atividade) {
		super();
		this.id = id;
		this.descricao = descricao;
		this.tipoContestacao = tipoContestacao;
		this.dataContestacao = dataContestacao;
		this.status = status;
		this.autor = autor;
		this.atividade = atividade;
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

	public TipoContestacao getTipoContestacao() {
		return tipoContestacao;
	}

	public void setTipoContestacao(TipoContestacao tipoContestacao) {
		this.tipoContestacao = tipoContestacao;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Usuario getAutor() {
		return autor;
	}

	public void setAutor(Usuario autor) {
		this.autor = autor;
	}

	public Date getDataContestacao() {
		return dataContestacao;
	}

	public void setDataContestacao(Date dataContestacao) {
		this.dataContestacao = dataContestacao;
	}

	public Atividade getAtividade() {
		return atividade;
	}

	public void setAtividade(Atividade atividade) {
		this.atividade = atividade;
	}

	@Override
	public String toString() {
	    return "Contestacao [id=" + id 
	    		+ "descricao=" + descricao
	    	    + "tipoContestacao=" + tipoContestacao
	    	    + "dataContestacao=" + dataContestacao
	    	    + "status=" + status
	    	    + "autor=" + autor
	    	    + "atividade=" + atividade + "]";
	}


}
