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

import br.ufpr.dto.AlunoDTO;
import br.ufpr.model.Aluno;
import br.ufpr.repository.AlunoRepository;
import br.ufpr.helper.PasswordUtils;

@CrossOrigin
@RestController
@RequestMapping(value = "alunos")
public class AlunoREST {

	@Autowired
	private AlunoRepository repo;

	@Autowired
	private ModelMapper mapper;

	@GetMapping
	public ResponseEntity<List<AlunoDTO>> obterTodosAlunos() {

		List<Aluno> lista = repo.findAll();

		if (lista.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(lista.stream().map(e -> mapper.map(e, AlunoDTO.class)).collect(Collectors.toList()));

	}

	@GetMapping("/{id}")
	public ResponseEntity<AlunoDTO> buscaPorId(@PathVariable Long id) {

		Optional<Aluno> aluno = repo.findById(id);
		if (aluno.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(aluno.get(), AlunoDTO.class));
		}
	}

	@PostMapping
	public ResponseEntity<AlunoDTO> inserirAluno(@RequestBody Aluno aluno) {

		try {
			String salt = PasswordUtils.generateSalt();
			aluno.setSalt(salt);
			aluno.setSenha(PasswordUtils.hashPassword(aluno.getSenha(), salt)); // Hashing a senha com o salt
			Aluno aln = repo.save(mapper.map(aluno, Aluno.class));
			Optional<Aluno> alnOpt = repo.findById(aln.getId());
			if (!alnOpt.isPresent()) {
				throw new Exception("Criação do aluno não foi realizada com sucesso");
			}
			return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(alnOpt.get(), AlunoDTO.class));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<AlunoDTO> alterarAluno(@PathVariable("id") long id, @RequestBody Aluno aluno) {
		Optional<Aluno> aln = repo.findById(id);

		if (aln.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			aluno.setId(id);
			repo.save(mapper.map(aluno, Aluno.class));
			aln = repo.findById(id);
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(aln.get(), AlunoDTO.class));
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> removerAluno(@PathVariable("id") long id) {

		Optional<Aluno> aluno = repo.findById(id);
		if (aluno.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			repo.delete(mapper.map(aluno.get(), Aluno.class));
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
	}
}