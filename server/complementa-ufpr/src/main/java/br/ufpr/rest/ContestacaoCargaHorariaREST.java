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

import br.ufpr.dto.ContestacaoCargaHorariaDTO;
import br.ufpr.model.ContestacaoCargaHoraria;
import br.ufpr.repository.ContestacaoCargaHorariaRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "contestacoes-carga-horaria")
public class ContestacaoCargaHorariaREST {

    @Autowired
    private ContestacaoCargaHorariaRepository repo;

    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<List<ContestacaoCargaHorariaDTO>> obterTodasContestacoesCargaHoraria() {

        List<ContestacaoCargaHoraria> lista = repo.findAll();

        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(lista.stream().map(e -> mapper.map(e, ContestacaoCargaHorariaDTO.class)).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContestacaoCargaHorariaDTO> buscaPorId(@PathVariable String id) {

        Optional<ContestacaoCargaHoraria> contestacaoCargaHoraria = repo.findById(id);
        if (contestacaoCargaHoraria.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(mapper.map(contestacaoCargaHoraria.get(), ContestacaoCargaHorariaDTO.class));
        }
    }

    @PostMapping
    public ResponseEntity<ContestacaoCargaHorariaDTO> inserirContestacaoCargaHoraria(@RequestBody ContestacaoCargaHoraria contestacaoCargaHoraria) {

        try {
            ContestacaoCargaHoraria contstCarga = repo.save(mapper.map(contestacaoCargaHoraria, ContestacaoCargaHoraria.class));
            Optional<ContestacaoCargaHoraria> contstCargaOpt = repo.findById(contstCarga.getId().toString());
            if (!contstCargaOpt.isPresent()) {
                throw new Exception("Criação da contestação de carga horária não foi realizada com sucesso");
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(contstCargaOpt.get(), ContestacaoCargaHorariaDTO.class));
        } catch (Exception e) {
        	System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContestacaoCargaHorariaDTO> alterarContestacaoCargaHoraria(@PathVariable("id") String id, @RequestBody ContestacaoCargaHoraria contestacaoCargaHoraria) {
        Optional<ContestacaoCargaHoraria> contstCarga = repo.findById(id);

        if (contstCarga.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            contestacaoCargaHoraria.setId(Long.parseLong(id));
            repo.save(mapper.map(contestacaoCargaHoraria, ContestacaoCargaHoraria.class));
            contstCarga = repo.findById(id);
            return ResponseEntity.status(HttpStatus.OK).body(mapper.map(contstCarga.get(), ContestacaoCargaHorariaDTO.class));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removerContestacaoCargaHoraria(@PathVariable("id") String id) {

        Optional<ContestacaoCargaHoraria> contestacaoCargaHoraria = repo.findById(id);
        if (contestacaoCargaHoraria.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            repo.delete(contestacaoCargaHoraria.get());
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
    }
}
