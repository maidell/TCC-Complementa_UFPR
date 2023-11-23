package br.ufpr.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataCriacao;

	@Column(name = "data_limite_candidatura")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataLimiteCandidatura;

	@Column(name = "data_conclusao")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataConclusao;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "projeto_id")
	private Projeto projeto;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_usuario")
	private Usuario autor;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_executor")
	private Usuario executor;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "competencia_id")
	private Competencia competencia;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "complexidade_id")
	private Complexidade complexidade;

	@OneToMany(mappedBy = "atividade", fetch = FetchType.LAZY)
	private List<Comentario> comentarios = new ArrayList<>();

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "certificado_id")
	private Certificado certificado;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "relatorio_de_conclusao")
	private RelatorioDeConclusao relatorioDeConclusao;

	@OneToMany(mappedBy = "atividade", fetch = FetchType.LAZY)
	private List<Anexo> anexos = new ArrayList<>();

	@OneToOne(fetch = FetchType.LAZY)
	private Contestacao contestacao;
	
	@OneToOne(fetch = FetchType.LAZY)
	private ContestacaoCargaHoraria contestacaoCargaHoraria;

	@Column(name = "fk_id_status")
	private Status status;

	public Atividade() {
	}
	
	public Atividade(Long id) {
		super();
		this.id = id;
	}

	public Atividade(Long id, String nome, String descricao, Date dataCriacao, Date dataLimiteCandidatura,
			Date dataConclusao, Projeto projeto, Usuario autor, Aluno executor, Competencia competencia,
			Complexidade complexidade, List<Comentario> comentarios, Certificado certificado,
			RelatorioDeConclusao relatorioDeConclusao, List<Anexo> anexos, Contestacao contestacao, ContestacaoCargaHoraria contestacaoCargaHoraria,
			Status status) {
		super();
		this.id = id;
		this.nome = nome;
		this.descricao = descricao;
		this.dataCriacao = dataCriacao;
		this.dataLimiteCandidatura = dataLimiteCandidatura;
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
		this.contestacao = contestacao;
		this.contestacaoCargaHoraria = contestacaoCargaHoraria;
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

	public Date getDataConclusao() {
		return dataConclusao;
	}

	public void setDataConclusao(Date dataConclusao) {
		this.dataConclusao = dataConclusao;
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

	public Usuario getExecutor() {
		return executor;
	}

	public void setExecutor(Usuario executor) {
		this.executor = executor;
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

	public Contestacao getContestacao() {
		return contestacao;
	}

	public void setContestacao(Contestacao contestacao) {
		this.contestacao = contestacao;
	}

	public ContestacaoCargaHoraria getContestacaoCargaHoraria() {
		return contestacaoCargaHoraria;
	}

	public void setContestacaoCargaHoraria(ContestacaoCargaHoraria contestacaoCargaHoraria) {
		this.contestacaoCargaHoraria = contestacaoCargaHoraria;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "Atividade [id=" + getId() 
				+ ", nome=" + getNome() 
				+ ", descricao=" + getDescricao() 
				+ ", dataCriacao=" + getDataCriacao()
				+ ", dataLimiteCandidatura=" + getDataLimiteCandidatura() 
				+ ", dataConclusao=" + getDataConclusao() 
				+ ", projeto=" + getProjeto() 
				+ ", autor=" + getAutor() 
				+ ", executor=" + getExecutor() 
				+ ", competencia=" + getCompetencia()
				+ ", complexidade=" + getComplexidade() 
				+ ", comentarios=" + getComentarios() 
				+ ", certificado=" + getCertificado()
				+ ", relatorioDeConclusao=" + getRelatorioDeConclusao() 
				+ ", anexos=" + getAnexos() 
				+ ", contestacao=" + getContestacao() 
				+ ", contestacaoCargaHoraria=" + getContestacaoCargaHoraria() 
				+ ", status=" + getStatus() + "]";
	}

}
