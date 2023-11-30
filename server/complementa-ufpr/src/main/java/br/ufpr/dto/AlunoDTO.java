package br.ufpr.dto;

public class AlunoDTO extends UsuarioDTO {

	private static final long serialVersionUID = 1L;
	private String grr;
	private GraduacaoSimplesDTO graduacao;

	public AlunoDTO() {
		super();
	}

	public AlunoDTO(Long id, String nome, String email, String telefone, String papel, String grr,
			GraduacaoSimplesDTO graduacao) {
		super(id, nome, email, telefone, papel);
		this.grr = grr;
		this.graduacao = graduacao;
	}

	public String getGrr() {
		return grr;
	}

	public void setGrr(String grr) {
		this.grr = grr;
	}

	public GraduacaoSimplesDTO getGraduacao() {
		return graduacao;
	}

	public void setGraduacao(GraduacaoSimplesDTO graduacao) {
		this.graduacao = graduacao;
	}

	@Override
	public String toString() {
		return "AlunoDTO [id=" + getId() + ", nome=" + getNome() + ", email=" + getEmail() + ", telefone="
				+ getTelefone() + ", papel=" + getPapel() + ", grr=" + getGrr() + ", graduacao=" + getGraduacao() + "]";
	}
}
