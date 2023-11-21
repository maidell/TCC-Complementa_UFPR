package br.ufpr.model;

import javax.persistence.*;

@Entity
@Table(name = "aluno", uniqueConstraints = { @UniqueConstraint(columnNames = { "grr_aluno" }) })
@Inheritance(strategy = InheritanceType.JOINED)
public class Aluno extends Usuario {

    private static final long serialVersionUID = 1L;

    @Column(name = "grr_aluno")
    private String grr;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_graduacao")
    private Graduacao graduacao;

    public Aluno() {
    }

    public Aluno(Long id, String nome, String email, String telefone, String senha, boolean ativo, Papel papel, String grr, Graduacao graduacao) {
        super(id, nome, email, telefone, senha, ativo, papel);
        this.grr = grr;
        this.graduacao = graduacao;
    }

    // Getters and Setters
    public String getGrr() {
        return grr;
    }

    public void setGrr(String grr) {
        this.grr = grr;
    }

    public Graduacao getGraduacao() {
        return graduacao;
    }

    public void setGraduacao(Graduacao graduacao) {
        this.graduacao = graduacao;
    }

    @Override
    public String toString() {
        return "Aluno [id=" + getId() + ", nome=" + getNome() + ", email=" + getEmail() + ", telefone=" + getTelefone()
                + ", papel=" + getPapel() + ", grr=" + grr + ", graduacao=" + graduacao + "]";
    }
}
