package br.ufpr.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
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
    private Orientador coordenador;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Servidor> servidoresCoordenadores;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Competencia> competencias;
    
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Complexidade> complexidades;

    public Graduacao() {
    }

	public Graduacao(Long id, String nome, Orientador coordenador, List<Servidor> servidoresCoordenadores,
			List<Competencia> competencias, List<Complexidade> complexidades) {
		super();
		this.id = id;
		this.nome = nome;
		this.coordenador = coordenador;
		this.servidoresCoordenadores = servidoresCoordenadores;
		this.competencias = competencias;
		this.complexidades = complexidades;
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

	public Orientador getCoordenador() {
		return coordenador;
	}

	public void setCoordenador(Orientador coordenador) {
		this.coordenador = coordenador;
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
	
	public List<Complexidade> getComplexidades() {
		return complexidades;
	}

	public void setComplexidades(List<Complexidade> complexidades) {
		this.complexidades = complexidades;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
    @Override
    public String toString() {
        return "Graduacao [id=" + getId() + ", nome=" + getNome() + ", coordenador=" + getCoordenador() +
        		", servidoresCoordenadores=" + getServidoresCoordenadores() + 
        		", competencias=" + getCompetencias() + ", complexidades=" + getComplexidades() + "]";
    }

}
