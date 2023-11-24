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

import br.ufpr.dto.ComplexidadeDTO;
import br.ufpr.model.Complexidade;
import br.ufpr.repository.ComplexidadeRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "complexidades")
public class ComplexidadeREST {

    @Autowired
    private ComplexidadeRepository repo;

    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<List<ComplexidadeDTO>> obterTodasComplexidades() {

        List<Complexidade> lista = repo.findAll();

        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(lista.stream().map(e -> mapper.map(e, ComplexidadeDTO.class)).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComplexidadeDTO> buscaPorId(@PathVariable Long id) {

        Optional<Complexidade> complexidade = repo.findById(id);
        if (complexidade.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(mapper.map(complexidade.get(), ComplexidadeDTO.class));
        }
    }

    @PostMapping
    public ResponseEntity<ComplexidadeDTO> inserirComplexidade(@RequestBody Complexidade complexidade) {

        try {
        	Complexidade cmplx = repo.save(mapper.map(complexidade, Complexidade.class));
            Optional<Complexidade> cmplxOpt = repo.findById(cmplx.getId());
            if (!cmplxOpt.isPresent()) {
                throw new Exception("Criação da complexidade não foi realizada com sucesso");
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(cmplxOpt.get(), ComplexidadeDTO.class));
        } catch (Exception e) {
        	System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ComplexidadeDTO> alterarComplexidade(@PathVariable("id") Long id, @RequestBody Complexidade complexidade) {
        Optional<Complexidade> cmplx = repo.findById(id);

        if (cmplx.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            complexidade.setId(id);
            repo.save(mapper.map(complexidade, Complexidade.class));
            cmplx = repo.findById(id);
            return ResponseEntity.status(HttpStatus.OK).body(mapper.map(cmplx.get(), ComplexidadeDTO.class));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removerComplexidade(@PathVariable("id") Long id) {

        Optional<Complexidade> complexidade = repo.findById(id);
        if (complexidade.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            repo.delete(complexidade.get());
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
    }
}
