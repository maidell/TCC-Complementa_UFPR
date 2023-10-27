package br.ufpr.model;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "coordenador")
public class Coordenador extends Orientador {

	private static final long serialVersionUID = 1L;

	public Coordenador() {
        super();
    }

    public Coordenador(Long id, String nome, String email, String telefone, String senha, Papel papel, String matricula, Graduacao graduacao) {
        super(id, nome, email, telefone, senha, papel, matricula, graduacao);
    }
}
