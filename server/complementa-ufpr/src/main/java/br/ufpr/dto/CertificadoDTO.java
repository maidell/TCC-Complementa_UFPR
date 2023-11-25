package br.ufpr.dto;

import java.io.Serializable;

public class CertificadoDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;

    public CertificadoDTO() {
    }

    public CertificadoDTO(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "CertificadoDTO [id=" + getId() + "]";
    }
}
