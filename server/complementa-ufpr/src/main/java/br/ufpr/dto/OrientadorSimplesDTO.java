package br.ufpr.dto;

public class OrientadorSimplesDTO extends ServidorDTO{

    private static final long serialVersionUID = 1L;

    public OrientadorSimplesDTO() {
    }

    public OrientadorSimplesDTO(Long id, String nome, String email, String telefone, String papel, String matricula) {
        super(id, nome, email, telefone, papel, matricula);
    }

    @Override
    public String toString() {
        return "OrientadorDTO [id=" + getId() + ", nome=" + getNome() + ", email=" + getEmail() + ", telefone="
                + getTelefone() + ", papel=" + getPapel() + ", matricula=" + getMatricula() + "]";
    }
}
