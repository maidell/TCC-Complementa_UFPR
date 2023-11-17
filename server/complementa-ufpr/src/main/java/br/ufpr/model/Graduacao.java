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
import javax.persistence.ManyToOne;
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
    private Coordenador coordenador;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<ServidorCoordenador> servidoresCoordenadores;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Competencia> competencias;

    public Graduacao() {
    }

	public Graduacao(Long id, String nome, Coordenador coordenador, List<ServidorCoordenador> servidoresCoordenadores,
			List<Competencia> competencias) {
		super();
		this.id = id;
		this.nome = nome;
		this.coordenador = coordenador;
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

	public Coordenador getCoordenador() {
		return coordenador;
	}

	public void setCoordenador(Coordenador coordenador) {
		this.coordenador = coordenador;
	}

	public List<ServidorCoordenador> getServidoresCoordenadores() {
		return servidoresCoordenadores;
	}

	public void setServidoresCoordenadores(List<ServidorCoordenador> servidoresCoordenadores) {
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
        return "Graduacao [id=" + getId() + ", nome=" + getNome() + ", coordenador=" + getCoordenador() +
        		", servidoresCoordenadores=" + getServidoresCoordenadores() + ", competencias=" + getCompetencias() + "]";
    }

}
