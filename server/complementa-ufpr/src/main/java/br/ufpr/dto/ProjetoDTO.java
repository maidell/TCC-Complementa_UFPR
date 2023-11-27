package br.ufpr.dto;

import java.io.Serializable;
import java.util.List;

import br.ufpr.model.Tipo;

public class ProjetoDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String nome;
    private String objetivoGeral;
    private String objetivosEspecificos;
    private OrientadorDTO orientador;
    private List<AlunoDTO> alunos;
    private List<AlunoDTO> monitores;
    private Tipo tipo;

    public ProjetoDTO() {
    }

    public ProjetoDTO(Long id, String nome, String objetivoGeral, String objetivosEspecificos, OrientadorDTO orientador,
            List<AlunoDTO> alunos, List<AlunoDTO> monitores, Tipo tipo) {
        this.id = id;
        this.nome = nome;
        this.objetivoGeral = objetivoGeral;
        this.objetivosEspecificos = objetivosEspecificos;
        this.orientador = orientador;
        this.alunos = alunos;
        this.monitores = monitores;
        this.tipo = tipo;
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

    public String getObjetivoGeral() {
		return objetivoGeral;
	}

	public void setObjetivoGeral(String objetivoGeral) {
		this.objetivoGeral = objetivoGeral;
	}

	public String getObjetivosEspecificos() {
		return objetivosEspecificos;
	}

	public void setObjetivosEspecificos(String objetivosEspecificos) {
		this.objetivosEspecificos = objetivosEspecificos;
	}

	public OrientadorDTO getOrientador() {
        return orientador;
    }

    public void setOrientador(OrientadorDTO orientador) {
        this.orientador = orientador;
    }

    public List<AlunoDTO> getAlunos() {
        return alunos;
    }

    public void setAlunos(List<AlunoDTO> alunos) {
        this.alunos = alunos;
    }

    public List<AlunoDTO> getMonitores() {
        return monitores;
    }

    public void setMonitores(List<AlunoDTO> monitores) {
        this.monitores = monitores;
    }
    
	public Tipo getTipo() {
		return tipo;
	}

	public void setTipo(Tipo tipo) {
		this.tipo = tipo;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
    
	@Override
    public String toString() {
        return "Projeto [id=" + getId() +
                ", nome='" + getNome() + '\'' +
                ", objetivoGeral='" + getObjetivoGeral() + '\'' +
                ", objetivosEspecificos='" + getObjetivosEspecificos() + '\'' +
                ", orientador=" + getOrientador() +
                ", alunos=" + getAlunos() +
                ", monitores=" + getMonitores() +
                ", tipo=" + getTipo() +
                "]";
	}
	
}
