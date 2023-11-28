package br.ufpr.dto;

public class OrientadorGraduacaoDTO extends ServidorDTO{

    private static final long serialVersionUID = 1L;

    private GraduacaoSimplesDTO graduacao;

    public OrientadorGraduacaoDTO() {
    }

    public OrientadorGraduacaoDTO(Long id, String nome, String email, String telefone, String papel, String matricula, GraduacaoSimplesDTO graduacao) {
        super(id, nome, email, telefone, papel, matricula);
        this.graduacao = graduacao;
    }

    public GraduacaoSimplesDTO getGraduacao() {
        return graduacao;
    }

    public void setGraduacao(GraduacaoSimplesDTO graduacao) {
        this.graduacao = graduacao;
    }

    @Override
    public String toString() {
        return "OrientadorDTO [id=" + getId() + ", nome=" + getNome() + ", email=" + getEmail() + ", telefone="
                + getTelefone() + ", papel=" + getPapel() + ", matricula=" + getMatricula() + ", graduacao=" + getGraduacao() + "]";
    }
}
