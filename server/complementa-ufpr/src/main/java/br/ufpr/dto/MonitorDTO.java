package br.ufpr.dto;

import java.io.Serializable;

public class MonitorDTO extends AlunoDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    public MonitorDTO() {
    }

    public MonitorDTO(Long id, String nome, String email, String telefone, String papel, String grr,
            GraduacaoDTO graduacao) {
        super(id, nome, email, telefone, papel, grr, graduacao);
    }

    @Override
    public String toString() {
        return "MonitorDTO [id=" + getId() + ", nome=" + getNome() + ", email=" + getEmail() + ", telefone=" + getTelefone()
                + ", papel=" + getPapel() + ", grr=" + getGrr() + ", graduacao=" + getGraduacao() + "]";
    }
}
