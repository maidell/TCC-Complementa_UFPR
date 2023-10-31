package br.ufpr.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "certificado")
public class Certificado implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
    private String id;

    public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Override
    public String toString() {
        return "Certificado [id=" + getId() + "]";
    }
}
