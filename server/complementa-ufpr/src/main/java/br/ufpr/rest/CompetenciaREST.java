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

import br.ufpr.dto.CompetenciaDTO;
import br.ufpr.model.Competencia;
import br.ufpr.repository.CompetenciaRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "competencias")
public class CompetenciaREST {

	@Autowired
	private CompetenciaRepository repo;

	@Autowired
	private ModelMapper mapper;

	@GetMapping
	public ResponseEntity<List<CompetenciaDTO>> obterTodasCompetencias() {

		List<Competencia> lista = repo.findAll();

		if (lista.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(lista.stream().map(e -> mapper.map(e, CompetenciaDTO.class)).collect(Collectors.toList()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<CompetenciaDTO> buscaPorId(@PathVariable Long id) {

		Optional<Competencia> competencia = repo.findById(id);
		if (competencia.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(competencia.get(), CompetenciaDTO.class));
		}
	}

	@PostMapping
	public ResponseEntity<CompetenciaDTO> inserirCompetencia(@RequestBody Competencia competencia) {

		try {
			Competencia cpt = repo.save(mapper.map(competencia, Competencia.class));
			Optional<Competencia> cptOpt = repo.findById(cpt.getId());
			if (!cptOpt.isPresent()) {
				throw new Exception("Criação da competencia não foi realizada com sucesso");
			}
			return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(cptOpt.get(), CompetenciaDTO.class));
		} catch (Exception e) {
			System.err.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<CompetenciaDTO> alterarCompetencia(@PathVariable("id") Long id, @RequestBody Competencia competencia) {
		Optional<Competencia> cpt = repo.findById(id);

		if (cpt.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			competencia.setId(id);
			repo.save(mapper.map(competencia, Competencia.class));
			cpt = repo.findById(id);
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(cpt.get(), CompetenciaDTO.class));
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> removerCompetencia(@PathVariable("id") Long id) {

		Optional<Competencia> competencia = repo.findById(id);
		if (competencia.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			repo.delete(competencia.get());
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
	}
}
