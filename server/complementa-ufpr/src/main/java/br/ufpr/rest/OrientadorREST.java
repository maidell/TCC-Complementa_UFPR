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

import br.ufpr.dto.OrientadorDTO;
import br.ufpr.helper.EmailService;
import br.ufpr.helper.PasswordUtils;
import br.ufpr.model.Graduacao;
import br.ufpr.model.Orientador;
import br.ufpr.model.Papel;
import br.ufpr.repository.GraduacaoRepository;
import br.ufpr.repository.OrientadorRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "orientadores")
public class OrientadorREST {

	@Autowired
	private OrientadorRepository repo;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private EmailService emailService;
	
	@Autowired
	private GraduacaoRepository repoGrad;

	@GetMapping
	public ResponseEntity<List<OrientadorDTO>> obterTodosOrientadores() {

		List<Orientador> lista = repo.findAll();

		if (lista.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(lista.stream().map(e -> mapper.map(e, OrientadorDTO.class)).collect(Collectors.toList()));
	}

	@GetMapping("/graduacoes/{id}")
	public ResponseEntity<List<OrientadorDTO>> obterTodosOrientadoresPorIdGraduacao(@PathVariable Long id) {
		
		Optional<Graduacao> optGrad = repoGrad.findById(id);
		if (!optGrad.isPresent()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		List<Orientador> lista = repo.findAllByGraduacaoId(optGrad.get().getId());

		if (lista.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(lista.stream().map(e -> mapper.map(e, OrientadorDTO.class)).collect(Collectors.toList()));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<OrientadorDTO> buscaPorId(@PathVariable Long id) {

		Optional<Orientador> orientador = repo.findById(id);
		if (!orientador.isPresent()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(orientador.get(), OrientadorDTO.class));
		}
	}

	@PostMapping
	public ResponseEntity<OrientadorDTO> inserirOrientador(@RequestBody Orientador orientador) {

		try {
			String salt = PasswordUtils.generateSalt();
			String senha = PasswordUtils.generatePassword();
			orientador.setSenha(senha);
			orientador.setSalt(salt);
			orientador.setAtivo(true);
			orientador.setSenha(PasswordUtils.hashPassword(orientador.getSenha(), salt));
			Orientador ori = repo.save(mapper.map(orientador, Orientador.class));
			Optional<Orientador> oriOpt = repo.findById(ori.getId());
			if (!oriOpt.isPresent()) {
				throw new Exception("Criação do orientador não foi realizada com sucesso");
			}
			String conteudoEmail = "Bem-vindo ao Complementa UFPR " + ori.getNome() + "! \n \n "
					+ "Por favor, realize seu login com as seguintes credenciais \n" + "E-mail: " + ori.getEmail()
					+ "\n" + "Senha: " + senha;
			emailService.enviarEmail(ori.getEmail(), "Complementa UFPR - Cadastro", conteudoEmail);
			return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(oriOpt.get(), OrientadorDTO.class));
		} catch (Exception e) {
			System.err.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<OrientadorDTO> alterarOrientador(@PathVariable("id") Long id,
			@RequestBody Orientador orientador) {
		Optional<Orientador> ori = repo.findById(id);
		
		if (!ori.isPresent()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			Optional<Graduacao> optGrad = repoGrad.findById(orientador.getGraduacao().getId());
			if(!optGrad.isPresent()) {
				if(optGrad.get().getCoordenador().getId() == orientador.getId()){
					orientador.setPapel(Papel.COORDENADOR);
				}else {
					orientador.setPapel(Papel.ORIENTADOR);
				}
			}
			Orientador newOri = ori.get();
			newOri.setNome(orientador.getNome());
			newOri.setTelefone(orientador.getTelefone());
			newOri.setMatricula(orientador.getMatricula());
			newOri.setGraduacao(orientador.getGraduacao());
			newOri.setPapel(orientador.getPapel());
			if (orientador.getSenha() != null && !orientador.getSenha().isEmpty()) {
				newOri.setSenha(PasswordUtils.hashPassword(orientador.getSenha(), newOri.getSalt()));
			}
			repo.save(mapper.map(newOri, Orientador.class));
			ori = repo.findById(id);
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(ori.get(), OrientadorDTO.class));
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> removerOrientador(@PathVariable("id") Long id) {

		Optional<Orientador> orientador = repo.findById(id);
		if (!orientador.isPresent()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			repo.delete(orientador.get());
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
	}
}
