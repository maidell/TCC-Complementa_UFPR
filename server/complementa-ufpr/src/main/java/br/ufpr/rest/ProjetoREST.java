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

import br.ufpr.dto.ProjetoDTO;
import br.ufpr.model.Aluno;
import br.ufpr.model.Projeto;
import br.ufpr.repository.ProjetoRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "projetos")
public class ProjetoREST {

    @Autowired
    private ProjetoRepository repo;

    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<List<ProjetoDTO>> obterTodosProjetos() {

        List<Projeto> lista = repo.findAll();

        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(lista.stream().map(e -> mapper.map(e, ProjetoDTO.class)).collect(Collectors.toList()));
    }
    
    @GetMapping("/usuarios/{id}")
    public ResponseEntity<List<ProjetoDTO>> obterTodosProjetosPorIntegrante(@PathVariable Long id) {

        List<Projeto> lista = repo.findAllByUserId(id);
        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(lista.stream().map(e -> mapper.map(e, ProjetoDTO.class)).collect(Collectors.toList()));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProjetoDTO> buscaPorId(@PathVariable Long id) {

        Optional<Projeto> projeto = repo.findById(id);
        if (!projeto.isPresent()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(mapper.map(projeto.get(), ProjetoDTO.class));
        }
    }

    @PostMapping
    public ResponseEntity<ProjetoDTO> inserirProjeto(@RequestBody Projeto projeto) {

        try {
            Projeto prj = repo.save(mapper.map(projeto, Projeto.class));
            Optional<Projeto> prjOpt = repo.findById(prj.getId());
            if (!prjOpt.isPresent()) {
                throw new Exception("Criação do projeto não foi realizada com sucesso");
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(prjOpt.get(), ProjetoDTO.class));
        } catch (Exception e) {
        	System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjetoDTO> alterarProjeto(@PathVariable("id") Long id, @RequestBody Projeto projeto) {
        Optional<Projeto> prj = repo.findById(id);

        if (!prj.isPresent()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
        	Projeto newProj = prj.get();
        	
            repo.save(mapper.map(projeto, Projeto.class));
            prj = repo.findById(id);
            return ResponseEntity.status(HttpStatus.OK).body(mapper.map(prj.get(), ProjetoDTO.class));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removerProjeto(@PathVariable("id") Long id) {

        Optional<Projeto> projeto = repo.findById(id);
        if (!projeto.isPresent()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            repo.delete(projeto.get());
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
    }
}
