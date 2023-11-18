package br.ufpr.model;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "atividade")
public class Atividade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "data_criacao")
    private Date dataCriacao;

    @Column(name = "data_limite_candidatura")
    private Date dataLimiteCandidatura;

    @Column(name = "data_contestacao")
    private Date dataContestacao;

    @Column(name = "data_conclusao")
    private Date dataConclusao;
    
    @ManyToOne
    @JoinColumn(name = "projeto_id")
    private Projeto projeto;
    
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "id_usuario")
    private Usuario autor;
   
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "grr_aluno")
    private Aluno executor;

    @ManyToOne
    @JoinColumn(name = "competencia_id")
    private Competencia competencia;

    @ManyToOne
    @JoinColumn(name = "complexidade_id")
    private Complexidade complexidade;

    @OneToMany(mappedBy = "atividade", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comentario> comentarios = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "certificado_id")
    private Certificado certificado;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "relatorio_de_conclusao")
    private RelatorioDeConclusao relatorioDeConclusao;

    @OneToMany(mappedBy = "atividade", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Anexo> anexos;
    
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "fk_id_status")
    private Status status;

    public Atividade() {
    }

    public Atividade(String nome, Date dataCriacao, Date dataLimiteCandidatura, Date dataContestacao, Date dataConclusao,
                     Competencia competencia, Complexidade complexidade, List<Comentario> comentarios, Certificado certificado) {
        this.nome = nome;
        this.dataCriacao = dataCriacao;
        this.dataLimiteCandidatura = dataLimiteCandidatura;
        this.dataContestacao = dataContestacao;
        this.dataConclusao = dataConclusao;
        this.competencia = competencia;
        this.complexidade = complexidade;
        this.comentarios = comentarios;
        this.certificado = certificado;
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

    public Date getDataContestacao() {
        return dataContestacao;
    }

    public void setDataContestacao(Date dataContestacao) {
        this.dataContestacao = dataContestacao;
    }

    public Date getDataConclusao() {
        return dataConclusao;
    }

    public void setDataConclusao(Date dataConclusao) {
        this.dataConclusao = dataConclusao;
    }

    public Competencia getCompetencia() {
        return competencia;
    }

    public void setCompetencia(Competencia competencia) {
        this.competencia = competencia;
    }

    public Complexidade getComplexidade() {
        return complexidade;
    }

    public void setComplexidade(Complexidade complexidade) {
        this.complexidade = complexidade;
    }

    public List<Comentario> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<Comentario> comentarios) {
        this.comentarios = comentarios;
    }
    
    public Certificado getCertificado() {
        return certificado;
    }

    public void setCertificado(Certificado certificado) {
        this.certificado = certificado;
    }
    
    @Override
    public String toString() {
        return "Atividade [id=" + id + ", nome=" + nome + ", dataCriacao=" + dataCriacao + ", dataLimiteCandidatura="
               + dataLimiteCandidatura + ", dataContestacao=" + dataContestacao + ", dataConclusao=" + dataConclusao
               + ", competencia=" + competencia + ", complexidade=" + complexidade + ", certificado=" + certificado
               + ", anexos=" + anexos + ", comentarios=" + comentarios + "]";
    }

}
