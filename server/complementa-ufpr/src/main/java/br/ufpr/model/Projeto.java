package br.ufpr.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "projeto")
public class Projeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_projeto")
    private Long id;

    @Column(name = "nome_projeto")
    private String nome;

    @Column(name = "descricao_projeto")
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "id_orientador")
    private Orientador orientador;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "projeto_aluno",
            joinColumns = @JoinColumn(name = "id_projeto"),
            inverseJoinColumns = @JoinColumn(name = "id_aluno")
    )
    private List<Aluno> alunos;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "projeto_monitor",
            joinColumns = @JoinColumn(name = "id_projeto"),
            inverseJoinColumns = @JoinColumn(name = "id_monitor")
    )
    private List<Aluno> monitores;

    public Projeto() {
    }

    public Projeto(Long id, String nome, String descricao, Orientador orientador, List<Aluno> alunos, List<Aluno> monitores) {
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

    public Orientador getOrientador() {
        return orientador;
    }

    public void setOrientador(Orientador orientador) {
        this.orientador = orientador;
    }

    public List<Aluno> getAlunos() {
        return alunos;
    }

    public void setAlunos(List<Aluno> alunos) {
        this.alunos = alunos;
    }

    public List<Aluno> getMonitores() {
        return monitores;
    }

    public void setMonitores(List<Aluno> monitores) {
        this.monitores = monitores;
    }
}
