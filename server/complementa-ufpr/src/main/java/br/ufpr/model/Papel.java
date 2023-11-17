package br.ufpr.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "papel")
public enum Papel {
    ALUNO(0),
    SERVIDOR(1),
    MONITOR(2),
    ORIENTADOR(3),
    COORDENADOR(4),
    SERVIDOR_COORDENADOR(5),
	ADMIN(6);

    @Id
    private int valor;

    Papel(int valor) {
        this.valor = valor;
    }

    public int getValor() {
        return valor;
    }
}