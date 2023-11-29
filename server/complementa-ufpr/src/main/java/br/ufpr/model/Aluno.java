package br.ufpr.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

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
    
    @ManyToMany
    @JoinTable(
        name = "aluno_atividade", 
        joinColumns = @JoinColumn(name = "aluno_id"), 
        inverseJoinColumns = @JoinColumn(name = "atividade_id"))
    private List<Atividade> atividades = new ArrayList<>();
    
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
    
    public List<Atividade> getAtividades() {
		return atividades;
	}

	public void setAtividades(List<Atividade> atividades) {
		this.atividades = atividades;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
    public String toString() {
        return "Aluno [id=" + getId() + ", nome=" + getNome() + ", email=" + getEmail() + ", telefone=" + getTelefone()
                + ", papel=" + getPapel() + ", grr=" + getGrr() + ", graduacao=" + getGraduacao() + ", atividades=" + getAtividades() + "]";
    }
}
