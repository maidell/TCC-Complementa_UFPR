package br.ufpr.model;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "monitor")
public class Monitor extends Aluno {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public Monitor() {
        super();
    }

    public Monitor(Long id, String nome, String email, String telefone, String senha, boolean ativo, Papel papel, String grr, Graduacao graduacao) {
        super(id, nome, email, telefone, senha, ativo, papel, grr, graduacao);
    }
}
