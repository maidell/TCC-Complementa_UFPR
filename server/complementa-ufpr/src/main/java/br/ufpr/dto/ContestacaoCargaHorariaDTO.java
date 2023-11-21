package br.ufpr.dto;

import java.util.Date;

import br.ufpr.model.Atividade;
import br.ufpr.model.Status;
import br.ufpr.model.TipoContestacao;
import br.ufpr.model.Usuario;

public class ContestacaoCargaHorariaDTO extends ContestacaoDTO {

		private static final long serialVersionUID = 1L;
		private double cargaHorariaOriginal;
		private double cargaHorariaNova;

		public ContestacaoCargaHorariaDTO() {
			super();
		}

		public ContestacaoCargaHorariaDTO(Long id, String descricao, TipoContestacao tipoContestacao, Date dataContestacao,
				Status status, Usuario autor, Atividade atividade, double cargaHorariaOriginal,
				double cargaHorariaNova) {
			super(id, descricao, tipoContestacao, dataContestacao, status, autor, atividade);
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
		    return "Contestacao [id=" + getId() + "descricao=" + getDescricao() + "tipoContestacao=" + getTipoContestacao()
		    	    + "dataContestacao=" + getDataContestacao() + "status=" + getStatus() + "autor=" + getAutor()
		    	    + "atividade=" + getAtividade() + ", cargaHorariaOriginal=" + getCargaHorariaOriginal() + ", cargaHorariaNova=" + getCargaHorariaNova() + "]";
		}
}
