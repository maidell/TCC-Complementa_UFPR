package br.ufpr.dto;

public class ContestacaoCargaHorariaDTO extends ContestacaoDTO{
	
	private static final long serialVersionUID = 1L;
	
	private double cargaHorariaOriginal;
	private double cargaHorariaNova;

	public ContestacaoCargaHorariaDTO() {
	}

	public ContestacaoCargaHorariaDTO(Long id, String descricao, double cargaHorariaOriginal, double cargaHorariaNova) {
		super(id, descricao);
		this.cargaHorariaOriginal = cargaHorariaOriginal;
		this.cargaHorariaNova = cargaHorariaNova;
	}

	public double getCargaHorariaOriginal() {
		return cargaHorariaOriginal;
	}

	public void setCargaHorariaOriginal(double cargaHorariaOriginal) {
		this.cargaHorariaOriginal = cargaHorariaOriginal;
	}

	public double getCargaHorariaNova() {
		return cargaHorariaNova;
	}

	public void setCargaHorariaNova(double cargaHorariaNova) {
		this.cargaHorariaNova = cargaHorariaNova;
	}
	
	@Override
	public String toString() {
	    return "ContestacaoCargaHorariaDTO [id=" + getId() + ", descricao=" + getDescricao() +
	           ", cargaHorariaOriginal=" + cargaHorariaOriginal + ", cargaHorariaNova=" + cargaHorariaNova + "]";
	}

}
