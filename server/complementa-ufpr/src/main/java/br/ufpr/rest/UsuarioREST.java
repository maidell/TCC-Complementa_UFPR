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

import br.ufpr.dto.UsuarioDTO;
import br.ufpr.helper.EmailService;
import br.ufpr.helper.PasswordUtils;
import br.ufpr.model.Aluno;
import br.ufpr.model.Usuario;
import br.ufpr.repository.UsuarioRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "usuarios")
public class UsuarioREST {

	@Autowired
	private UsuarioRepository repo;

	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private EmailService emailService;
	
	@GetMapping
	public ResponseEntity<List<UsuarioDTO>> obterTodosUsuarios() {

		List<Usuario> lista = repo.findAll();

		if (lista.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(lista.stream().map(e -> mapper.map(e, UsuarioDTO.class)).collect(Collectors.toList()));

	}

	@GetMapping("/{id}")
	public ResponseEntity<UsuarioDTO> buscaPorId(@PathVariable Long id) {

		Optional<Usuario> usuario = repo.findById(id);
		if (usuario.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(usuario, UsuarioDTO.class));
		}
	}

	@PostMapping
	public ResponseEntity<UsuarioDTO> inserirUsuario(@RequestBody Usuario usuario) {
		
		if(repo.findByEmail(usuario.getEmail()).isPresent()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
		}

		try {
			String salt = PasswordUtils.generateSalt();
			String senha = PasswordUtils.generatePassword();
			usuario.setSenha(senha);
			usuario.setSalt(salt);
			usuario.setAtivo(true);
			usuario.setSenha(PasswordUtils.hashPassword(usuario.getSenha(), salt)); // Hashing a senha com o salt
			Usuario usu = repo.save(mapper.map(usuario, Usuario.class));
			Optional<Usuario> usuOpt = repo.findById(usu.getId());
			if (!usuOpt.isPresent()) {
				throw new Exception("Criação do usuario não foi realizada com sucesso");
			}
			String conteudoEmail = "Bem-vindo ao Complementa UFPR " + usuario.getNome() + "! \n \n "
					+ "Por favor, realize seu login com as seguintes credenciais \n"
					+ "E-mail: " + usuario.getEmail() + "\n"
					+ "Senha: " + senha;
					emailService.enviarEmail(usuario.getEmail(), "Confirmação de Email", conteudoEmail);
			return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(usuOpt.get(), UsuarioDTO.class));
		} catch (Exception e) {
			System.err.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<UsuarioDTO> alterarUsuario(@PathVariable("id") long id, @RequestBody Usuario usuario) {
		Optional<Usuario> usu = repo.findById(id);

		if (usu.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			Usuario newUsu = usu.get();
			newUsu.setNome(usuario.getNome());
			newUsu.setTelefone(usuario.getTelefone());
			if (usuario.getSenha() != null && !usuario.getSenha().isEmpty()) {
				newUsu.setSenha(PasswordUtils.hashPassword(usuario.getSenha(), newUsu.getSalt()));
			}
			repo.save(mapper.map(newUsu, Usuario.class));
			usu = repo.findById(id);
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(usu, UsuarioDTO.class));
		}

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> removerUsuario(@PathVariable("id") long id) {

		Optional<Usuario> usuario = repo.findById(id);
		if (usuario.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			repo.delete(mapper.map(usuario, Usuario.class));
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
	}
}
