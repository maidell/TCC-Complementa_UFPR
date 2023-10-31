package br.ufpr.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tipo_contestacao")
public enum TipoContestacao {
    CARGA_HORARIA(0),
    EXECUCAO(1);

    @Id
    private int valor;

    TipoContestacao(int valor) {
        this.valor = valor;
    }

    public int getValor() {
        return valor;
    }
}