package br.ufpr.rest;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.model.Aluno;
import br.ufpr.repository.AlunoRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "confirmacao")
public class ConfirmacaoREST {
	
	@Autowired
	private AlunoRepository repo;
	
	@Autowired
    private ModelMapper mapper;

	@GetMapping("/{email}")
	public ResponseEntity<String> buscaPorEmaileAtiva(@PathVariable String email) {

		Optional<Aluno> aln = repo.findByEmail(email);
		if (aln.isEmpty()) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		} else {
			Aluno aluno = aln.get();
			if(aluno.isAtivo()) {
				return ResponseEntity.status(HttpStatus.LOCKED).body("Cadastro já está ativo");
			}
			aluno.setAtivo(true);
			repo.save(mapper.map(aluno, Aluno.class));
			aln = repo.findById(aluno.getId());
			
			if(aln.get().isAtivo()){
				return ResponseEntity.status(HttpStatus.OK).body("Cadastro ativado com Sucesso!");
			}else { 
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
			}
		}
	}
	
}
