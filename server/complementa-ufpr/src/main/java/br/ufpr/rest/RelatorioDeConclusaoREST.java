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

import br.ufpr.dto.RelatorioDeConclusaoDTO;
import br.ufpr.model.RelatorioDeConclusao;
import br.ufpr.repository.RelatorioDeConclusaoRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "relatorios-de-conclusao")
public class RelatorioDeConclusaoREST {

    @Autowired
    private RelatorioDeConclusaoRepository repo;

    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<List<RelatorioDeConclusaoDTO>> obterTodosRelatorios() {

        List<RelatorioDeConclusao> lista = repo.findAll();

        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(lista.stream().map(e -> mapper.map(e, RelatorioDeConclusaoDTO.class)).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RelatorioDeConclusaoDTO> buscaPorId(@PathVariable String id) {

        Optional<RelatorioDeConclusao> relatorio = repo.findById(id);
        if (relatorio.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(mapper.map(relatorio.get(), RelatorioDeConclusaoDTO.class));
        }
    }

    @PostMapping
    public ResponseEntity<RelatorioDeConclusaoDTO> inserirRelatorio(@RequestBody RelatorioDeConclusao relatorio) {

        try {
            RelatorioDeConclusao rlt = repo.save(mapper.map(relatorio, RelatorioDeConclusao.class));
            Optional<RelatorioDeConclusao> rltOpt = repo.findById(rlt.getId().toString());
            if (!rltOpt.isPresent()) {
                throw new Exception("Criação do relatório não foi realizada com sucesso");
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(rltOpt.get(), RelatorioDeConclusaoDTO.class));
        } catch (Exception e) {
        	System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<RelatorioDeConclusaoDTO> alterarRelatorio(@PathVariable("id") String id, @RequestBody RelatorioDeConclusao relatorio) {
        Optional<RelatorioDeConclusao> rlt = repo.findById(id);

        if (rlt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            relatorio.setId(Long.parseLong(id));
            repo.save(mapper.map(relatorio, RelatorioDeConclusao.class));
            rlt = repo.findById(id);
            return ResponseEntity.status(HttpStatus.OK).body(mapper.map(rlt.get(), RelatorioDeConclusaoDTO.class));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removerRelatorio(@PathVariable("id") String id) {

        Optional<RelatorioDeConclusao> relatorio = repo.findById(id);
        if (relatorio.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            repo.delete(relatorio.get());
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
    }
}
