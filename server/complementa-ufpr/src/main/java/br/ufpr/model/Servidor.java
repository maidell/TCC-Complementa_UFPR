package br.ufpr.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

@Entity
@Table(name = "servidor")
@Inheritance(strategy = InheritanceType.JOINED)
public class Servidor extends Usuario {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Column(name = "matricula_servidor")
    private String matricula;

    public Servidor(Long id, String nome, String email, String telefone, String senha, Papel papel, String matricula) {
        super(id, nome, email, telefone, senha, papel);
        this.matricula = matricula;
    }

    public Servidor() {
        super();
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    @Override
    public String toString() {
        return "Servidor [id=" + getId() + ", nome=" + getNome() + ", email=" + getEmail() + ", telefone=" + getTelefone()
                + ", senha=" + getSenha() + ", papel=" + getPapel() + ", matricula=" + matricula + "]";
    }
}
