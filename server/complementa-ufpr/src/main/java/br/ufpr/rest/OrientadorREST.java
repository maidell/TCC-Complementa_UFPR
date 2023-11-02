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
import br.ufpr.helper.PasswordUtils;
import br.ufpr.model.Orientador;
import br.ufpr.repository.OrientadorRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "orientadores")
public class OrientadorREST {

    @Autowired
    private OrientadorRepository repo;

    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<List<OrientadorDTO>> obterTodosOrientadores() {

        List<Orientador> lista = repo.findAll();

        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(lista.stream().map(e -> mapper.map(e, OrientadorDTO.class)).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrientadorDTO> buscaPorId(@PathVariable String id) {

        Optional<Orientador> orientador = repo.findById(id);
        if (orientador.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(mapper.map(orientador.get(), OrientadorDTO.class));
        }
    }

    @PostMapping
    public ResponseEntity<OrientadorDTO> inserirOrientador(@RequestBody Orientador orientador) {

        try {
        	String salt = PasswordUtils.generateSalt();
        	orientador.setSalt(salt);
        	orientador.setSenha(PasswordUtils.hashPassword(orientador.getSenha(), salt));
            Orientador ori = repo.save(orientador);
            Optional<Orientador> oriOpt = repo.findById(ori.getId().toString());
            if (!oriOpt.isPresent()) {
                throw new Exception("Criação do orientador não foi realizada com sucesso");
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(oriOpt.get(), OrientadorDTO.class));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrientadorDTO> alterarOrientador(@PathVariable("id") String id, @RequestBody Orientador orientador) {
        Optional<Orientador> ori = repo.findById(id);

        if (ori.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            orientador.setId(Long.parseLong(id));
            repo.save(orientador);
            ori = repo.findById(id);
            return ResponseEntity.status(HttpStatus.OK).body(mapper.map(ori.get(), OrientadorDTO.class));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removerOrientador(@PathVariable("id") String id) {

        Optional<Orientador> orientador = repo.findById(id);
        if (orientador.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            repo.delete(orientador.get());
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
    }
}