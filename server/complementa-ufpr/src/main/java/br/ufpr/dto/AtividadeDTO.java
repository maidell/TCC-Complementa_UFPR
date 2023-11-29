package br.ufpr.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import br.ufpr.model.Graduacao;
import br.ufpr.model.Status;

public class AtividadeDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String nome;
	private String descricao;
	private Date dataCriacao;
	private Date dataLimiteCandidatura;
	private Date dataConclusao;
	private ProjetoDTO projeto;
	private UsuarioDTO autor;
	private AlunoDTO executor;
	private CompetenciaDTO competencia;
	private ComplexidadeDTO complexidade;
	private List<ComentarioDTO> comentarios = new ArrayList<>();
	private CertificadoDTO certificado;
	private RelatorioDeConclusaoDTO relatorioDeConclusao;
	private List<AnexoDTO> anexos = new ArrayList<>();
	private List<AlunoDTO> candidatos;
	private ContestacaoDTO contestacao;
	private ContestacaoCargaHorariaDTO contestacaoCargaHoraria;
	private List<GraduacaoSimplesDTO> graduacoes = new ArrayList<>();
	private Status status;

	public AtividadeDTO() {
	}

	public AtividadeDTO(Long id, String nome, String descricao, Date dataCriacao, Date dataLimiteCandidatura,
			Date dataConclusao, ProjetoDTO projeto, UsuarioDTO autor, AlunoDTO executor, CompetenciaDTO competencia,
			ComplexidadeDTO complexidade, List<ComentarioDTO> comentarios, CertificadoDTO certificado,
			RelatorioDeConclusaoDTO relatorioDeConclusao, List<AnexoDTO> anexos, List<AlunoDTO> candidatos, ContestacaoDTO contestacao,
			ContestacaoCargaHorariaDTO contestacaoCargaHoraria, List<GraduacaoSimplesDTO> graduacoes, Status status) {
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
		this.candidatos = candidatos;
		this.contestacao = contestacao;
		this.contestacaoCargaHoraria = contestacaoCargaHoraria;
		this.graduacoes = graduacoes;
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

	public ProjetoDTO getProjeto() {
		return projeto;
	}

	public void setProjeto(ProjetoDTO projeto) {
		this.projeto = projeto;
	}

	public UsuarioDTO getAutor() {
		return autor;
	}

	public void setAutor(UsuarioDTO autor) {
		this.autor = autor;
	}

	public AlunoDTO getExecutor() {
		return executor;
	}

	public void setExecutor(AlunoDTO executor) {
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

	public CertificadoDTO getCertificado() {
		return certificado;
	}

	public void setCertificado(CertificadoDTO certificado) {
		this.certificado = certificado;
	}

	public RelatorioDeConclusaoDTO getRelatorioDeConclusao() {
		return relatorioDeConclusao;
	}

	public void setRelatorioDeConclusao(RelatorioDeConclusaoDTO relatorioDeConclusao) {
		this.relatorioDeConclusao = relatorioDeConclusao;
	}

	public List<AnexoDTO> getAnexos() {
		return anexos;
	}

	public void setAnexos(List<AnexoDTO> anexos) {
		this.anexos = anexos;
	}
	
	public List<AlunoDTO> getCandidatos() {
		return candidatos;
	}

	public void setCandidatos(List<AlunoDTO> candidatos) {
		this.candidatos = candidatos;
	}

	public ContestacaoDTO getContestacao() {
		return contestacao;
	}
	public void setContestacao(ContestacaoDTO contestacao) {
		this.contestacao = contestacao;
	}

	public ContestacaoCargaHorariaDTO getContestacaoCargaHoraria() {
		return contestacaoCargaHoraria;
	}

	public void setContestacaoCargaHoraria(ContestacaoCargaHorariaDTO contestacaoCargaHoraria) {
		this.contestacaoCargaHoraria = contestacaoCargaHoraria;
	}
	
	public List<GraduacaoSimplesDTO> getGraduacoes() {
		return graduacoes;
	}

	public void setGraduacoes(List<GraduacaoSimplesDTO> graduacoes) {
		this.graduacoes = graduacoes;
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
				+ ", candidatos=" + getCandidatos()
				+ ", contestacao=" + getContestacao() 
				+ ", contestacaoCargaHoraria=" + getContestacaoCargaHoraria()
				+ ", graduacoes=" + getGraduacoes() 
				+ ", status=" + getStatus() + "]";
	}

}
