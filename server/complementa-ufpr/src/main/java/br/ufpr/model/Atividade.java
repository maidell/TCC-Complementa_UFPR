package br.ufpr.model;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "atividade")
public class Atividade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "descricao")
    private String descricao;
    
    @Column(name = "data_criacao")
    private Date dataCriacao;

    @Column(name = "data_limite_candidatura")
    private Date dataLimiteCandidatura;

    @Column(name = "data_contestacao")
    private Date dataContestacao;

    @Column(name = "data_conclusao")
    private Date dataConclusao;
    
    @ManyToOne
    @JoinColumn(name = "projeto_id")
    private Projeto projeto;
    
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "id_usuario")
    private Usuario autor;
   
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "grr_aluno")
    private Aluno executor;

    @ManyToOne
    @JoinColumn(name = "competencia_id")
    private Competencia competencia;

    @ManyToOne
    @JoinColumn(name = "complexidade_id")
    private Complexidade complexidade;

    @OneToMany(mappedBy = "atividade", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comentario> comentarios = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "certificado_id")
    private Certificado certificado;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "relatorio_de_conclusao")
    private RelatorioDeConclusao relatorioDeConclusao;

    @OneToMany(mappedBy = "atividade", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Anexo> anexos;
    
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "fk_id_status")
    private Status status;

    public Atividade() {
    }

    

    public Atividade(Long id, String nome, String descricao, Date dataCriacao, Date dataLimiteCandidatura,
			Date dataContestacao, Date dataConclusao, Projeto projeto, Usuario autor, Aluno executor,
			Competencia competencia, Complexidade complexidade, List<Comentario> comentarios, Certificado certificado,
			RelatorioDeConclusao relatorioDeConclusao, List<Anexo> anexos, Status status) {
		super();
		this.id = id;
		this.nome = nome;
		this.descricao = descricao;
		this.dataCriacao = dataCriacao;
		this.dataLimiteCandidatura = dataLimiteCandidatura;
		this.dataContestacao = dataContestacao;
		this.dataConclusao = dataConclusao;
		this.projeto = projeto;
		this.autor = autor;
		this.executor = executor;
		this.competencia = competencia;
		this.complexidade = complexidade;
		this.comentarios = comentarios;
		this.certificado = certificado;
		this.relatorioDeConclusao = relatorioDeConclusao;
		this.anexos = anexos;
		this.status = status;
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
    
    public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Projeto getProjeto() {
		return projeto;
	}

	public void setProjeto(Projeto projeto) {
		this.projeto = projeto;
	}

	public Usuario getAutor() {
		return autor;
	}

	public void setAutor(Usuario autor) {
		this.autor = autor;
	}

	public Aluno getExecutor() {
		return executor;
	}

	public void setExecutor(Aluno executor) {
		this.executor = executor;
	}

	public RelatorioDeConclusao getRelatorioDeConclusao() {
		return relatorioDeConclusao;
	}

	public void setRelatorioDeConclusao(RelatorioDeConclusao relatorioDeConclusao) {
		this.relatorioDeConclusao = relatorioDeConclusao;
	}

	public List<Anexo> getAnexos() {
		return anexos;
	}

	public void setAnexos(List<Anexo> anexos) {
		this.anexos = anexos;
	}

	public Status getStatus() {
		return status;
	}



	public void setStatus(Status status) {
		this.status = status;
	}



	public Date getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(Date dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Date getDataLimiteCandidatura() {
        return dataLimiteCandidatura;
    }

    public void setDataLimiteCandidatura(Date dataLimiteCandidatura) {
        this.dataLimiteCandidatura = dataLimiteCandidatura;
    }

    public Date getDataContestacao() {
        return dataContestacao;
    }

    public void setDataContestacao(Date dataContestacao) {
        this.dataContestacao = dataContestacao;
    }

    public Date getDataConclusao() {
        return dataConclusao;
    }

    public void setDataConclusao(Date dataConclusao) {
        this.dataConclusao = dataConclusao;
    }

    public Competencia getCompetencia() {
        return competencia;
    }

    public void setCompetencia(Competencia competencia) {
        this.competencia = competencia;
    }

    public Complexidade getComplexidade() {
        return complexidade;
    }

    public void setComplexidade(Complexidade complexidade) {
        this.complexidade = complexidade;
    }

    public List<Comentario> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<Comentario> comentarios) {
        this.comentarios = comentarios;
    }
    
    public Certificado getCertificado() {
        return certificado;
    }

    public void setCertificado(Certificado certificado) {
        this.certificado = certificado;
    }
    
    @Override
    public String toString() {
        return "Atividade [id=" + id + ", nome=" + nome + ", dataCriacao=" + dataCriacao + ", dataLimiteCandidatura="
               + dataLimiteCandidatura + ", dataContestacao=" + dataContestacao + ", dataConclusao=" + dataConclusao
               + ", competencia=" + competencia + ", complexidade=" + complexidade + ", certificado=" + certificado
               + ", anexos=" + anexos + ", comentarios=" + comentarios + "]";
    }

}
