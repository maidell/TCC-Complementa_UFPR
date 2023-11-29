package br.ufpr.dto;

import java.io.Serializable;

public class ServidorDTO extends UsuarioDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String matricula;

    public ServidorDTO() {
    }

    public ServidorDTO(Long id, String nome, String email, String telefone, String papel, String matricula) {
        super(id, nome, email, telefone, papel);
        this.matricula = matricula;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    @Override
    public String toString() {
        return "ServidorDTO [id=" + getId() + ", nome=" + getNome() + ", email=" + getEmail() + ", telefone="
                + getTelefone() + ", papel=" + getPapel() + ", matricula=" + getMatricula() + "]";
    }
}
