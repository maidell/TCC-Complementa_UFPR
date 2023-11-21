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

import br.ufpr.dto.MonitorDTO;
import br.ufpr.helper.EmailService;
import br.ufpr.helper.PasswordUtils;
import br.ufpr.model.Monitor;
import br.ufpr.repository.MonitorRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "monitores")
public class MonitorREST {

	@Autowired
	private MonitorRepository repo;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private EmailService emailService;

	@GetMapping
	public ResponseEntity<List<MonitorDTO>> obterTodosMonitores() {

		List<Monitor> lista = repo.findAll();

		if (lista.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(lista.stream().map(e -> mapper.map(e, MonitorDTO.class)).collect(Collectors.toList()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<MonitorDTO> buscaPorId(@PathVariable String id) {

		Optional<Monitor> monitor = repo.findById(id);
		if (monitor.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(monitor.get(), MonitorDTO.class));
		}
	}

	@PostMapping
	public ResponseEntity<MonitorDTO> inserirMonitor(@RequestBody Monitor monitor) {

		try {
			String salt = PasswordUtils.generateSalt();
			String senha = PasswordUtils.generatePassword();
			monitor.setSenha(senha);
			monitor.setSalt(salt);
			monitor.setAtivo(true);
			monitor.setSenha(PasswordUtils.hashPassword(monitor.getSenha(), salt));
			Monitor mon = repo.save(mapper.map(monitor, Monitor.class));
			Optional<Monitor> monOpt = repo.findById(mon.getId());
			if (!monOpt.isPresent()) {
				throw new Exception("Criação do monitor não foi realizada com sucesso");
			}
			String conteudoEmail = "Bem-vindo ao Complementa UFPR " + monitor.getNome() + "! \n \n "
					+ "Por favor, realize seu login com as seguintes credenciais \n" + "E-mail: " + monitor.getEmail()
					+ "\n" + "Senha: " + senha;
			emailService.enviarEmail(mon.getEmail(), "Complementa UFPR - Cadastro", conteudoEmail);
			return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(monOpt.get(), MonitorDTO.class));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<MonitorDTO> alterarMonitor(@PathVariable("id") String id, @RequestBody Monitor monitor) {
		Optional<Monitor> mon = repo.findById(id);

		if (mon.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			monitor.setId(Long.parseLong(id));
			repo.save(monitor);
			mon = repo.findById(id);
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(mon.get(), MonitorDTO.class));
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> removerMonitor(@PathVariable("id") String id) {

		Optional<Monitor> monitor = repo.findById(id);
		if (monitor.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			repo.delete(monitor.get());
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
	}
}
