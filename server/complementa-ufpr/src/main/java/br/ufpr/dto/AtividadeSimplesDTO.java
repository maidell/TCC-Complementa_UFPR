package br.ufpr.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import br.ufpr.model.Status;

public class AtividadeSimplesDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String nome;
	private String descricao;
	private Date dataCriacao;
	private Date dataLimiteCandidatura;
	private Date dataConclusao;
	private Status status;

	public AtividadeSimplesDTO() {
	}

	public AtividadeSimplesDTO(Long id, String nome, String descricao, Date dataCriacao, Date dataLimiteCandidatura,
			Date dataConclusao, Status status) {
		super();
		this.id = id;
		this.nome = nome;
		this.descricao = descricao;
		this.dataCriacao = dataCriacao;
		this.dataLimiteCandidatura = dataLimiteCandidatura;
		this.dataConclusao = dataConclusao;
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
				+ ", status=" + getStatus() + "]";
	}

}
