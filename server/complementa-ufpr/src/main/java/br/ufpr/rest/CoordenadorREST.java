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

import br.ufpr.dto.CoordenadorDTO;
import br.ufpr.helper.EmailService;
import br.ufpr.helper.PasswordUtils;
import br.ufpr.model.Coordenador;
import br.ufpr.repository.CoordenadorRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "coordenadores")
public class CoordenadorREST {

	@Autowired
	private CoordenadorRepository repo;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private EmailService emailService;

	@GetMapping
	public ResponseEntity<List<CoordenadorDTO>> obterTodosCoordenadores() {

		List<Coordenador> lista = repo.findAll();

		if (lista.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(lista.stream().map(e -> mapper.map(e, CoordenadorDTO.class)).collect(Collectors.toList()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<CoordenadorDTO> buscaPorId(@PathVariable String id) {

		Optional<Coordenador> coordenador = repo.findById(id);
		if (coordenador.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(coordenador.get(), CoordenadorDTO.class));
		}
	}

	@PostMapping
	public ResponseEntity<CoordenadorDTO> inserirCoordenador(@RequestBody Coordenador coordenador) {

		try {
			String salt = PasswordUtils.generateSalt();
			String senha = PasswordUtils.generatePassword();
			coordenador.setSenha(senha);
			coordenador.setSalt(salt);
			coordenador.setAtivo(true);
			coordenador.setSenha(PasswordUtils.hashPassword(coordenador.getSenha(), salt));
			Coordenador coord = repo.save(mapper.map(coordenador, Coordenador.class));
			Optional<Coordenador> coordOpt = repo.findById(coord.getId());
			if (!coordOpt.isPresent()) {
				throw new Exception("Criação do coordenador não foi realizada com sucesso");
			}
			String conteudoEmail = "Bem-vindo ao Complementa UFPR " + coordenador.getNome() + "! \n \n "
					+ "Por favor, realize seu login com as seguintes credenciais \n" + "E-mail: " + coord.getEmail()
					+ "\n" + "Senha: " + senha;
			emailService.enviarEmail(coord.getEmail(), "Complementa UFPR - Cadastro", conteudoEmail);
			return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(coordOpt.get(), CoordenadorDTO.class));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<CoordenadorDTO> alterarCoordenador(@PathVariable("id") String id,
			@RequestBody Coordenador coordenador) {
		Optional<Coordenador> coord = repo.findById(id);

		if (coord.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			coordenador.setId(Long.parseLong(id));
			repo.save(coordenador);
			coord = repo.findById(id);
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(coord.get(), CoordenadorDTO.class));
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> removerCoordenador(@PathVariable("id") String id) {

		Optional<Coordenador> coordenador = repo.findById(id);
		if (coordenador.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			repo.delete(coordenador.get());
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
	}
}
