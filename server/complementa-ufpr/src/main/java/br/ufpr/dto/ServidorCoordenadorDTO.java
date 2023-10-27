package br.ufpr.dto;

public class ServidorCoordenadorDTO extends ServidorDTO {

	private static final long serialVersionUID = 1L;

	public ServidorCoordenadorDTO() {
        super();
    }

    public ServidorCoordenadorDTO(Long id, String nome, String email, String telefone, String papel, String matricula) {
        super(id, nome, email, telefone, papel, matricula);
    }
}
