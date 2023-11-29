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

import br.ufpr.dto.ContestacaoDTO;
import br.ufpr.model.Contestacao;
import br.ufpr.repository.ContestacaoRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "contestacoes")
public class ContestacaoREST {

    @Autowired
    private ContestacaoRepository repo;

    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<List<ContestacaoDTO>> obterTodasContestacoes() {

        List<Contestacao> lista = repo.findAll();

        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(lista.stream().map(e -> mapper.map(e, ContestacaoDTO.class)).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContestacaoDTO> buscaPorId(@PathVariable Long id) {

        Optional<Contestacao> contestacao = repo.findById(id);
        if (!contestacao.isPresent()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(mapper.map(contestacao.get(), ContestacaoDTO.class));
        }
    }

    @PostMapping
    public ResponseEntity<ContestacaoDTO> inserirContestacao(@RequestBody Contestacao contestacao) {

        try {
            Contestacao contst = repo.save(mapper.map(contestacao, Contestacao.class));
            Optional<Contestacao> contstOpt = repo.findById(contst.getId());
            if (!contstOpt.isPresent()) {
                throw new Exception("Criação da contestação não foi realizada com sucesso");
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(contstOpt.get(), ContestacaoDTO.class));
        } catch (Exception e) {
        	System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContestacaoDTO> alterarContestacao(@PathVariable("id") Long id, @RequestBody Contestacao contestacao) {
        Optional<Contestacao> contst = repo.findById(id);

        if (!contst.isPresent()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            contestacao.setId(id);
            repo.save(mapper.map(contestacao, Contestacao.class));
            contst = repo.findById(id);
            return ResponseEntity.status(HttpStatus.OK).body(mapper.map(contst.get(), ContestacaoDTO.class));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removerContestacao(@PathVariable("id") Long id) {

        Optional<Contestacao> contestacao = repo.findById(id);
        if (!contestacao.isPresent()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            repo.delete(contestacao.get());
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
    }
}
