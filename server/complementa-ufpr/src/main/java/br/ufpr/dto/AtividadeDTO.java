package br.ufpr.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import br.ufpr.model.Aluno;
import br.ufpr.model.Projeto;
import br.ufpr.model.Status;
import br.ufpr.model.Usuario;

public class AtividadeDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String nome;
	private Date dataCriacao;
	private Date dataLimiteCandidatura;
	private Date dataContestacao;
	private Date dataConclusao;
    private Projeto projeto;
    private Usuario autor;
    private Aluno executor;
	private CompetenciaDTO competencia;
	private ComplexidadeDTO complexidade;
	private List<ComentarioDTO> comentarios;
	private CertificadoDTO certificado;
	private RelatorioDeConclusaoDTO relatorioDeConclusao;
	private Status status;

	public AtividadeDTO() {
	}
	
	public AtividadeDTO(Long id, String nome, Date dataCriacao, Date dataLimiteCandidatura, Date dataContestacao,
			Date dataConclusao, Projeto projeto, Usuario autor, Aluno executor, CompetenciaDTO competencia,
			ComplexidadeDTO complexidade, List<ComentarioDTO> comentarios, CertificadoDTO certificado,
			RelatorioDeConclusaoDTO relatorioDeConclusao, Status status) {
		super();
		this.id = id;
		this.nome = nome;
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

	public CompetenciaDTO getCompetencia() {
		return competencia;
	}

	public void setCompetencia(CompetenciaDTO competencia) {
		this.competencia = competencia;
	}

	public ComplexidadeDTO getComplexidade() {
		return complexidade;
	}

	public void setComplexidade(ComplexidadeDTO complexidade) {
		this.complexidade = complexidade;
	}

	public List<ComentarioDTO> getComentarios() {
		return comentarios;
	}

	public void setComentarios(List<ComentarioDTO> comentarios) {
		this.comentarios = comentarios;
	}

	public RelatorioDeConclusaoDTO getRelatorioDeConclusao() {
		return relatorioDeConclusao;
	}

	public void setRelatorioDeConclusao(RelatorioDeConclusaoDTO relatorioDeConclusao) {
		this.relatorioDeConclusao = relatorioDeConclusao;
	}

	public CertificadoDTO getCertificado() {
		return certificado;
	}

	public void setCertificado(CertificadoDTO certificado) {
		this.certificado = certificado;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	
	 @Override
	    public String toString() {
	        return "AtividadeDTO [id=" + getId() + ", nome=" + getNome() + ", dataCriacao=" + getDataCriacao()
	               + ", dataLimiteCandidatura=" + getDataLimiteCandidatura() + ", dataContestacao=" + getDataContestacao()
	               + ", dataConclusao=" + getDataConclusao() + ", projeto=" + getProjeto() + ", autor=" + getAutor()
	               + ", executor=" + getExecutor() + ", competencia=" + getCompetencia()
	               + ", complexidade=" + getComplexidade() + ", certificado=" + getCertificado()
	               + ", relatorioDeConclusao=" + getRelatorioDeConclusao() + ", comentarios=" + getComentarios() + ", status=" + getStatus() + "]";
	    }

}