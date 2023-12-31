package br.ufpr.rest;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.dto.GraduacaoDTO;
import br.ufpr.dto.GraduacaoSimplesDTO;
import br.ufpr.model.Graduacao;
import br.ufpr.model.Orientador;
import br.ufpr.model.Papel;
import br.ufpr.repository.GraduacaoRepository;
import br.ufpr.repository.OrientadorRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "graduacoes")
public class GraduacaoREST {

	@Autowired
	private GraduacaoRepository repo;

	@Autowired
	private OrientadorRepository repoOri;

	@Autowired
	private ModelMapper mapper;

	@GetMapping
	public ResponseEntity<List<GraduacaoDTO>> obterTodasGraduacoes() {

		List<Graduacao> lista = repo.findAll();

		if (lista.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(lista.stream().map(e -> mapper.map(e, GraduacaoDTO.class)).collect(Collectors.toList()));
	}

	@GetMapping("/autocadastro")
	public ResponseEntity<List<GraduacaoSimplesDTO>> obterTodasGraduacoesSimples() {

		List<Graduacao> lista = repo.findAll();

		if (lista.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(lista.stream().map(e -> mapper.map(e, GraduacaoSimplesDTO.class)).collect(Collectors.toList()));
	}

	@GetMapping("/coordenadores/{id}")
	public ResponseEntity<GraduacaoDTO> buscaPorIdCoordenador(@PathVariable Long id) {

		Optional<Orientador> optCoord = repoOri.findById(id);
		if (!optCoord.isPresent()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			if (optCoord.get().getPapel() == Papel.COORDENADOR) {
				Optional<Graduacao> graduacao = repo.findByCoordenadorId(id);
				if (!graduacao.isPresent()) {
					return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
				} else {
					Graduacao grad = graduacao.get();
					return ResponseEntity.status(HttpStatus.OK).body(mapper.map(grad, GraduacaoDTO.class));
				}
			} else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
			}

		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<GraduacaoDTO> buscaPorId(@PathVariable Long id) {

		Optional<Graduacao> graduacao = repo.findById(id);
		if (!graduacao.isPresent()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			Graduacao grad = graduacao.get();
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(grad, GraduacaoDTO.class));
		}
	}

	@PostMapping
	public ResponseEntity<GraduacaoDTO> inserirGraduacao(@RequestBody Graduacao graduacao) {

		try {
			Graduacao grad = repo.save(mapper.map(graduacao, Graduacao.class));
			Optional<Graduacao> gradOpt = repo.findById(grad.getId());
			if (!gradOpt.isPresent()) {
				throw new Exception("Criação da graduação não foi realizada com sucesso");
			}
			return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(gradOpt.get(), GraduacaoDTO.class));
		} catch (Exception e) {
			System.err.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<GraduacaoDTO> alterarGraduacao(@PathVariable("id") Long id,
			@RequestBody Graduacao graduacao) {
		Optional<Graduacao> grad = repo.findById(id);

		if (!grad.isPresent()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			graduacao.setId(id);
			repo.save(mapper.map(graduacao, Graduacao.class));
			grad = repo.findById(id);
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(grad.get(), GraduacaoDTO.class));
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> removerGraduacao(@PathVariable("id") Long id) {

		Optional<Graduacao> graduacao = repo.findById(id);
		if (!graduacao.isPresent()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			repo.delete(graduacao.get());
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
	}

}
