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
import br.ufpr.helper.EmailService;
import br.ufpr.helper.PasswordUtils;
import br.ufpr.model.Aluno;
import br.ufpr.repository.AlunoRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "alunos")
public class AlunoREST {

	@Autowired
	private AlunoRepository repo;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private EmailService emailService;

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
			String senha = PasswordUtils.generatePassword();
			aluno.setSenha(senha);
			aluno.setSalt(salt);
			aluno.setAtivo(true);
			aluno.setSenha(PasswordUtils.hashPassword(aluno.getSenha(), salt)); // Hashing a senha com o salt
			Aluno aln = repo.save(mapper.map(aluno, Aluno.class));
			Optional<Aluno> alnOpt = repo.findById(aln.getId());
			if (!alnOpt.isPresent()) {
				throw new Exception("Criação do aluno não foi realizada com sucesso");
			}
				String conteudoEmail = "Bem-vindo ao Complementa UFPR " + aluno.getNome() + "! \n \n "
						+ "Por favor, realize seu login com as seguintes credenciais \n"
						+ "E-mail: " + aluno.getEmail() + "\n"
						+ "Senha: " + senha;
				emailService.enviarEmail(aluno.getEmail(), "Complementa UFPR - Cadastro", conteudoEmail);	
			return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(alnOpt.get(), AlunoDTO.class));
		} catch (Exception e) {
			System.err.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<AlunoDTO> alterarAluno(@PathVariable("id") long id, @RequestBody Aluno aluno) {
		Optional<Aluno> aln = repo.findById(id);

		if (aln.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			Aluno newAln = aln.get();
			newAln.setNome(aluno.getNome());
			newAln.setTelefone(aluno.getTelefone());
			newAln.setGraduacao(aluno.getGraduacao());
			if (aluno.getSenha() != null && !aluno.getSenha().isEmpty()) {
				newAln.setSenha(PasswordUtils.hashPassword(aluno.getSenha(), newAln.getSalt()));
			}
			repo.save(mapper.map(newAln, Aluno.class));
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
