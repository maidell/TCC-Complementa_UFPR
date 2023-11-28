package br.ufpr.dto;

import java.io.Serializable;
import java.util.List;

import br.ufpr.model.Competencia;
import br.ufpr.model.Complexidade;
import br.ufpr.model.Orientador;
import br.ufpr.model.Servidor;

public class GraduacaoDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String nome;
    private OrientadorSimplesDTO coordenador;
    private List<ServidorDTO> servidoresCoordenadores;
    private List<CompetenciaDTO> competencias;
    private List<ComplexidadeDTO> complexidades;

    public GraduacaoDTO() {
    }

    public GraduacaoDTO(Long id, String nome, OrientadorSimplesDTO coordenador, List<ServidorDTO> servidoresCoordenadores,
			List<CompetenciaDTO> competencias, List<ComplexidadeDTO> complexidades) {
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
    
    public OrientadorSimplesDTO getCoordenador() {
		return coordenador;
	}

	public void setCoordenador(OrientadorSimplesDTO coordenador) {
		this.coordenador = coordenador;
	}

	public List<ServidorDTO> getServidoresCoordenadores() {
		return servidoresCoordenadores;
	}

	public void setServidoresCoordenadores(List<ServidorDTO> servidoresCoordenadores) {
		this.servidoresCoordenadores = servidoresCoordenadores;
	}

	public List<CompetenciaDTO> getCompetencias() {
        return competencias;
    }

    public void setCompetencias(List<CompetenciaDTO> competencias) {
        this.competencias = competencias;
    }
    
    public List<ComplexidadeDTO> getComplexidades() {
		return complexidades;
	}

	public void setComplexidades(List<ComplexidadeDTO> complexidades) {
		this.complexidades = complexidades;
	}
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
    public String toString() {
        return "GraduacaoDTO [id=" + getId() + ", nome=" + getNome() +
        		", coordenador=" + getCoordenador() +
        		", servidoresCoordenadores=" + getServidoresCoordenadores() +
        		", competencias=" + getCompetencias() +
        		", complexidades=" + getComplexidades() + "]";
    }

}
