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

import br.ufpr.dto.ComentarioDTO;
import br.ufpr.model.Atividade;
import br.ufpr.model.Comentario;
import br.ufpr.model.Usuario;
import br.ufpr.repository.AtividadeRepository;
import br.ufpr.repository.ComentarioRepository;
import br.ufpr.repository.UsuarioRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "comentarios")
public class ComentarioREST {

	@Autowired
	private ComentarioRepository repo;

	@Autowired
	private AtividadeRepository atRepo;
	
	@Autowired
	private UsuarioRepository usuRepo;
	
	@Autowired
	private ModelMapper mapper;

	@GetMapping
	public ResponseEntity<List<ComentarioDTO>> obterTodosComentarios() {

		List<Comentario> lista = repo.findAll();

		if (lista.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(lista.stream().map(e -> mapper.map(e, ComentarioDTO.class)).collect(Collectors.toList()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<ComentarioDTO> buscaPorId(@PathVariable Long id) {

		Optional<Comentario> comentario = repo.findById(id);
		if (!comentario.isPresent()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(comentario.get(), ComentarioDTO.class));
		}
	}

	@PostMapping("/{id}")
	public ResponseEntity<ComentarioDTO> inserirComentario(@PathVariable Long id, @RequestBody Comentario comentario) {

		try {
			Optional<Atividade> atv = atRepo.findById(id);
			Optional<Usuario> usu = usuRepo.findById(comentario.getUsuario().getId());
			if (!atv.isPresent() && !usu.isPresent()) {
				throw new Exception("Criação do comentário não foi realizada com sucesso");
			}
			Comentario cmt = mapper.map(comentario, Comentario.class);
			cmt.setAtividade(atv.get());
			cmt = repo.save(mapper.map(cmt, Comentario.class));
			Optional<Comentario> cmtOpt = repo.findById(cmt.getId());
			if (!cmtOpt.isPresent()) {
				throw new Exception("Criação do comentário não foi realizada com sucesso");
			}
			return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(cmtOpt.get(), ComentarioDTO.class));
		} catch (Exception e) {
			System.err.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<ComentarioDTO> alterarComentario(@PathVariable("id") Long id, @RequestBody Comentario comentario) {
		Optional<Comentario> cmt = repo.findById(id);

		if (!cmt.isPresent()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			comentario.setId(id);
			repo.save(mapper.map(comentario, Comentario.class));
			cmt = repo.findById(id);
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(cmt.get(), ComentarioDTO.class));
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> removerComentario(@PathVariable("id") Long id) {

		Optional<Comentario> comentario = repo.findById(id);
		if (!comentario.isPresent()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			repo.delete(comentario.get());
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
	}
}
