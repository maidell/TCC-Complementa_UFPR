package br.ufpr.rest;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
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
@RequestMapping(value = "autocadastro")
public class AutocadastroREST {

	@Autowired
	private AlunoRepository repo;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private ModelMapper mapper;
	
	@PostMapping
	public ResponseEntity<AlunoDTO> autocadastrarAluno(@RequestBody Aluno aluno) {

		try {
			String salt = PasswordUtils.generateSalt();
			aluno.setSalt(salt);
			aluno.setSenha(PasswordUtils.hashPassword(aluno.getSenha(), salt)); // Hashing da senha com o salt
			Aluno aln = repo.save(mapper.map(aluno, Aluno.class));
			Optional<Aluno> alnOpt = repo.findById(aln.getId());
			if (!alnOpt.isPresent()) {
				throw new Exception("Criação do aluno não foi realizada com sucesso.");
			}
			if (alnOpt.isPresent()) {
				try {
				String conteudoEmail = "Bem-vindo ao Complementa UFPR " + aluno.getNome() + "! \n \n Por favor, confirme seu e-mail clicando aqui: http://localhost:4200/confirmacao/" + URLEncoder.encode(aluno.getEmail(), StandardCharsets.UTF_8);
		        emailService.enviarEmail(aluno.getEmail(), "Confirmação de Email", conteudoEmail);
				}catch(Exception e) {
					System.err.println(e);
				}
		    }
			return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(alnOpt.get(), AlunoDTO.class));
		} catch (Exception e) {
			System.err.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
}
