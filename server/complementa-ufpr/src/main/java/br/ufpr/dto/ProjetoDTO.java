package br.ufpr.dto;

import java.io.Serializable;
import java.util.List;

public class ProjetoDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String nome;
    private String descricao;
    private OrientadorDTO orientador;
    private List<AlunoDTO> alunos;
    private List<MonitorDTO> monitores;

    public ProjetoDTO() {
    }

    public ProjetoDTO(Long id, String nome, String descricao, OrientadorDTO orientador,
            List<AlunoDTO> alunos, List<MonitorDTO> monitores) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.orientador = orientador;
        this.alunos = alunos;
        this.monitores = monitores;
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

    public List<MonitorDTO> getMonitores() {
        return monitores;
    }

    public void setMonitores(List<MonitorDTO> monitores) {
        this.monitores = monitores;
    }

    @Override
    public String toString() {
        return "ProjetoDTO [id=" + getId() +
                ", nome='" + getNome() + '\'' +
                ", descricao='" + getDescricao() + '\'' +
                ", orientador=" + getOrientador() +
                ", alunos=" + getAlunos() +
                ", monitores=" + getMonitores() +
                "]";
    }

}
