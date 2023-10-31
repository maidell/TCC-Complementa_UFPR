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

import br.ufpr.dto.AnexoDTO;
import br.ufpr.model.Anexo;
import br.ufpr.repository.AnexoRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "anexos")
public class AnexoREST {

	@Autowired
	private AnexoRepository repo;

	@Autowired
	private ModelMapper mapper;

	@GetMapping
	public ResponseEntity<List<AnexoDTO>> obterTodosAnexos() {

		List<Anexo> lista = repo.findAll();

		if (lista.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(lista.stream().map(e -> mapper.map(e, AnexoDTO.class)).collect(Collectors.toList()));

	}

	@GetMapping("/{id}")
	public ResponseEntity<AnexoDTO> buscaPorId(@PathVariable String id) {

		Optional<Anexo> anexo = repo.findById(id);
		if (anexo.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(anexo.get(), AnexoDTO.class));
		}
	}

	@PostMapping
	public ResponseEntity<AnexoDTO> inserirAnexo(@RequestBody Anexo anexo) {

		try {
			Anexo anx = repo.save(anexo);
			Optional<Anexo> anxOpt = repo.findById(anx.getId().toString());
			if (!anxOpt.isPresent()) {
				throw new Exception("Criação do anexo não foi realizada com sucesso");
			}
			return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(anxOpt.get(), AnexoDTO.class));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<AnexoDTO> alterarAnexo(@PathVariable("id") String id, @RequestBody Anexo anexo) {
		Optional<Anexo> anx = repo.findById(id);

		if (anx.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			anexo.setId(Long.parseLong(id));
			repo.save(anexo);
			anx = repo.findById(id);
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(anx.get(), AnexoDTO.class));
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> removerAnexo(@PathVariable("id") String id) {

		Optional<Anexo> anexo = repo.findById(id);
		if (anexo.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			repo.delete(anexo.get());
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
	}
}
