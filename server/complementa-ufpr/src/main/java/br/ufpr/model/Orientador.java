package br.ufpr.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "orientador")
@Inheritance(strategy = InheritanceType.JOINED)
public class Orientador extends Servidor {

	private static final long serialVersionUID = 1L;
	
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_graduacao")
    private Graduacao graduacao;

    public Orientador() {
        super();
    }

    public Orientador(Long id, String nome, String email, String telefone, String senha, Papel papel, String matricula, Graduacao graduacao) {
        super(id, nome, email, telefone, senha, papel, matricula);
        this.graduacao = graduacao;
    }

    public Graduacao getGraduacao() {
        return graduacao;
    }

    public void setGraduacao(Graduacao graduacao) {
        this.graduacao = graduacao;
    }
}
