package br.ufpr.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "graduacao")
public class Graduacao implements Serializable{
	
	private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToOne(fetch = FetchType.LAZY)
    private Orientador orientador;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Servidor> servidoresCoordenadores;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Competencia> competencias;

    public Graduacao() {
    }

	public Graduacao(Long id, String nome, Orientador orientador, List<Servidor> servidoresCoordenadores,
			List<Competencia> competencias) {
		super();
		this.id = id;
		this.nome = nome;
		this.orientador = orientador;
		this.servidoresCoordenadores = servidoresCoordenadores;
		this.competencias = competencias;
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

	public Orientador getOrientador() {
		return orientador;
	}

	public void setCoordenador(Orientador orientador) {
		this.orientador = orientador;
	}

	public List<Servidor> getServidoresCoordenadores() {
		return servidoresCoordenadores;
	}

	public void setServidoresCoordenadores(List<Servidor> servidoresCoordenadores) {
		this.servidoresCoordenadores = servidoresCoordenadores;
	}

	public List<Competencia> getCompetencias() {
		return competencias;
	}

	public void setCompetencias(List<Competencia> competencias) {
		this.competencias = competencias;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
    @Override
    public String toString() {
        return "Graduacao [id=" + getId() + ", nome=" + getNome() + ", coordenador=" + getOrientador() +
        		", servidoresCoordenadores=" + getServidoresCoordenadores() + ", competencias=" + getCompetencias() + "]";
    }

}
