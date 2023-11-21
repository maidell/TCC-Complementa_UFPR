package br.ufpr.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "status")
public enum Status {
    ABERTA(0),
    EM_EXECUCAO(1),
    FINALIZADA(2),
    EXECUCAO_CONTESTADA(3),
    CARGA_HORARIA_CONTESTADA(4),
	DEFERIDA(5),
	INDEFERIDA(6);

    @Id
    private int valor;

    Status(int valor) {
        this.valor = valor;
    }

    public int getValor() {
        return valor;
    }
}