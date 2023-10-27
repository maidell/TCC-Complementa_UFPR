package br.ufpr.rest;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.dto.LoginDTO;
import br.ufpr.dto.UsuarioDTO;
import br.ufpr.model.Usuario;
import br.ufpr.repository.UsuarioRepository;
import br.ufpr.helper.PasswordUtils; // Import da classe PasswordUtils

@RestController
public class AuthREST {

	@Autowired
	private UsuarioRepository repository;
	
	@Autowired
	private ModelMapper mapper;

	@PostMapping("/login")
	public ResponseEntity<UsuarioDTO> login(@RequestBody LoginDTO login) {

		try {
			Optional<Usuario> usuOpt = repository.findByEmail(login.getEmail());

			if (usuOpt.isEmpty()) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
			}
			Usuario usu = usuOpt.get();

			Boolean senhaValida = PasswordUtils.checkPassword(login.getSenha(), usu.getSenha(), usu.getSalt());
			if (!senhaValida) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
			}
			return ResponseEntity.ok(mapper.map(usu, UsuarioDTO.class));
			
		} catch (Exception e) {
			System.err.println("Erro ao validar login:" + e.toString());
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(null);
		}
	}
}
