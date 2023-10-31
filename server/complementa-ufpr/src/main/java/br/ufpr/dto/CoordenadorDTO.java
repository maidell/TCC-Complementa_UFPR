package br.ufpr.dto;

import java.io.Serializable;

public class CoordenadorDTO extends OrientadorDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    public CoordenadorDTO() {
    }

    public CoordenadorDTO(Long id, String nome, String email, String telefone, String papel, String matricula, GraduacaoDTO graduacao) {
        super(id, nome, email, telefone, papel, matricula, graduacao);
    }

    @Override
    public String toString() {
        return "CoordenadorDTO [id=" + getId() + ", nome=" + getNome() + ", email=" + getEmail() + ", telefone="
                + getTelefone() + ", papel=" + getPapel() + ", matricula=" + getMatricula() + ", graduacao=" + getGraduacao() + "]";
    }
}
