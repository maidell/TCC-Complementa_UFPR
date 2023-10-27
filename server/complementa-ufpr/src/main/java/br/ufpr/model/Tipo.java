package br.ufpr.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tipo")
public enum Tipo {
    EXTENSAO(0),
    TCC(1),
    MESTRADO(2),
    DOUTORADO(3),
    OUTROS(4);

    @Id
    private int valor;

    Tipo(int valor) {
        this.valor = valor;
    }

    public int getValor() {
        return valor;
    }
}