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

import br.ufpr.dto.ServidorDTO;
import br.ufpr.helper.EmailService;
import br.ufpr.helper.PasswordUtils;
import br.ufpr.model.Orientador;
import br.ufpr.model.Servidor;
import br.ufpr.repository.ServidorRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "servidores")
public class ServidorREST {

	@Autowired
	private ServidorRepository repo;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private EmailService emailService;

	@GetMapping
	public ResponseEntity<List<ServidorDTO>> obterTodosServidores() {

		List<Servidor> lista = repo.findAll();

		if (lista.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(lista.stream().map(e -> mapper.map(e, ServidorDTO.class)).collect(Collectors.toList()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<ServidorDTO> buscaPorId(@PathVariable Long id) {

		Optional<Servidor> servidor = repo.findById(id);
		if (!servidor.isPresent()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(servidor.get(), ServidorDTO.class));
		}
	}

	@PostMapping
	public ResponseEntity<ServidorDTO> inserirServidor(@RequestBody Servidor servidor) {

		try {
			String salt = PasswordUtils.generateSalt();
			String senha = PasswordUtils.generatePassword();
			servidor.setSenha(senha);
			servidor.setSalt(salt);
			servidor.setAtivo(true);
			servidor.setSenha(PasswordUtils.hashPassword(servidor.getSenha(), salt));
			Servidor srv = repo.save(mapper.map(servidor, Servidor.class));
			Optional<Servidor> srvOpt = repo.findById(srv.getId());
			if (!srvOpt.isPresent()) {
				throw new Exception("Criação do servidor não foi realizada com sucesso");
			}
			String conteudoEmail = "Bem-vindo ao Complementa UFPR " + srv.getNome() + "! \n \n "
					+ "Por favor, realize seu login com as seguintes credenciais \n" + "E-mail: " + srv.getEmail()
					+ "\n" + "Senha: " + senha;
			emailService.enviarEmail(srv.getEmail(), "Complementa UFPR - Cadastro", conteudoEmail);
			return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(srvOpt.get(), ServidorDTO.class));
		} catch (Exception e) {
			System.err.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<ServidorDTO> alterarServidor(@PathVariable("id") Long id, @RequestBody Servidor servidor) {
		Optional<Servidor> srv = repo.findById(id);

		if (!srv.isPresent()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			Servidor newSrv = srv.get();
			newSrv.setNome(servidor.getNome());
			newSrv.setTelefone(servidor.getTelefone());
			newSrv.setMatricula(servidor.getMatricula());
			if (servidor.getSenha() != null && !servidor.getSenha().isEmpty()) {
				newSrv.setSenha(PasswordUtils.hashPassword(servidor.getSenha(), newSrv.getSalt()));
			}
			repo.save(mapper.map(newSrv, Servidor.class));
			srv = repo.findById(id);
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(srv.get(), ServidorDTO.class));
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> removerServidor(@PathVariable("id") Long id) {

		Optional<Servidor> servidor = repo.findById(id);
		if (!servidor.isPresent()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			repo.delete(servidor.get());
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
	}
}
