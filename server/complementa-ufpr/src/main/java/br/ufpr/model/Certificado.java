package br.ufpr.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "certificado" )
public class Certificado implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
    private Long id;
	
	@Column(name = "nome")
	private String nome;
	
	@Column(name = "orientador")
	private String orientador;
	
	@Column(name = "projeto")
	private String projeto;
	
	@Column(name = "horas")
	private int horas;
	
	@Column(name = "hash")
	private String hash;
	
	@Column(name = "salt")
	private String salt;
	
    public Certificado() {
		super();
	}
	
    public Certificado(Long id, String nome, String orientador, String projeto, int horas, String hash) {
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

	public int getHoras() {
		return horas;
	}

	public void setHoras(int horas) {
		this.horas = horas;
	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
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
