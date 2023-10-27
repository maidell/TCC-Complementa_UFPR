package br.ufpr.dto;

public class OrientadorDTO extends ServidorDTO{

    private static final long serialVersionUID = 1L;

    private GraduacaoDTO graduacao;

    public OrientadorDTO() {
    }

    public OrientadorDTO(Long id, String nome, String email, String telefone, String papel, String matricula, GraduacaoDTO graduacao) {
        super(id, nome, email, telefone, papel, matricula);
        this.graduacao = graduacao;
    }

    public GraduacaoDTO getGraduacao() {
        return graduacao;
    }

    public void setGraduacao(GraduacaoDTO graduacao) {
        this.graduacao = graduacao;
    }

    @Override
    public String toString() {
        return "OrientadorDTO [id=" + getId() + ", nome=" + getNome() + ", email=" + getEmail() + ", telefone="
                + getTelefone() + ", papel=" + getPapel() + ", matricula=" + getMatricula() + ", graduacao=" + graduacao + "]";
    }
}
