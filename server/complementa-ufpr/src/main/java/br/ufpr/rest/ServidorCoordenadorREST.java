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

import br.ufpr.dto.ServidorCoordenadorDTO;
import br.ufpr.helper.EmailService;
import br.ufpr.helper.PasswordUtils;
import br.ufpr.model.ServidorCoordenador;
import br.ufpr.repository.ServidorCoordenadorRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "servidoresCoordenadores")
public class ServidorCoordenadorREST {

	@Autowired
	private ServidorCoordenadorRepository repo;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private EmailService emailService;

	@GetMapping
	public ResponseEntity<List<ServidorCoordenadorDTO>> obterTodosServidoresCoordenadores() {

		List<ServidorCoordenador> lista = repo.findAll();

		if (lista.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(
				lista.stream().map(e -> mapper.map(e, ServidorCoordenadorDTO.class)).collect(Collectors.toList()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<ServidorCoordenadorDTO> buscaPorId(@PathVariable String id) {

		Optional<ServidorCoordenador> servidorCoordenador = repo.findById(id);
		if (servidorCoordenador.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.OK)
					.body(mapper.map(servidorCoordenador.get(), ServidorCoordenadorDTO.class));
		}
	}

	@PostMapping
	public ResponseEntity<ServidorCoordenadorDTO> inserirServidorCoordenador(
			@RequestBody ServidorCoordenador servidorCoordenador) {

		try {
			String salt = PasswordUtils.generateSalt();
			String senha = PasswordUtils.generatePassword();
			servidorCoordenador.setSenha(senha);
			servidorCoordenador.setSalt(salt);
			servidorCoordenador.setAtivo(true);
			ServidorCoordenador sc = repo.save(mapper.map(servidorCoordenador, ServidorCoordenador.class));
			Optional<ServidorCoordenador> scOpt = repo.findById(sc.getId());
			if (!scOpt.isPresent()) {
				throw new Exception("Criação do servidor coordenador não foi realizada com sucesso");
			}
			String conteudoEmail = "Bem-vindo ao Complementa UFPR " + sc.getNome() + "! \n \n "
					+ "Por favor, realize seu login com as seguintes credenciais \n" + "E-mail: " + sc.getEmail() + "\n"
					+ "Senha: " + senha;
			emailService.enviarEmail(sc.getEmail(), "Complementa UFPR - Cadastro", conteudoEmail);
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(mapper.map(scOpt.get(), ServidorCoordenadorDTO.class));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<ServidorCoordenadorDTO> alterarServidorCoordenador(@PathVariable("id") String id,
			@RequestBody ServidorCoordenador servidorCoordenador) {
		Optional<ServidorCoordenador> sc = repo.findById(id);

		if (sc.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			servidorCoordenador.setId(Long.parseLong(id));
			repo.save(servidorCoordenador);
			sc = repo.findById(id);
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(sc.get(), ServidorCoordenadorDTO.class));
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> removerServidorCoordenador(@PathVariable("id") String id) {

		Optional<ServidorCoordenador> servidorCoordenador = repo.findById(id);
		if (servidorCoordenador.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			repo.delete(servidorCoordenador.get());
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
	}
}
