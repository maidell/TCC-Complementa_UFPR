package br.ufpr.dto;

import java.io.Serializable;

public class CertificadoDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
	private String nome;
	private String orientador;
	private String projeto;
	private double horas;
	private String hash;
	
    public CertificadoDTO() {
    }

    public CertificadoDTO(Long id, String nome, String orientador, String projeto, double horas, String hash) {
		super();
		this.id = id;
		this.nome = nome;
		this.orientador = orientador;
		this.projeto = projeto;
		this.horas = horas;
		this.hash = hash;
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

	public String getOrientador() {
		return orientador;
	}

	public void setOrientador(String orientador) {
		this.orientador = orientador;
	}

	public String getProjeto() {
		return projeto;
	}

	public void setProjeto(String projeto) {
		this.projeto = projeto;
	}

	public double getHoras() {
		return horas;
	}

	public void setHoras(double horas) {
		this.horas = horas;
	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
    public String toString() {
        return "Certificado [id=" + getId() 
        + "nome=" + getNome()
        + "orientador=" + getOrientador()
        + "projeto=" + getProjeto()
        + "horas=" + getHoras()
        + "hash=" + getHash()
        + "]";
    }
}
