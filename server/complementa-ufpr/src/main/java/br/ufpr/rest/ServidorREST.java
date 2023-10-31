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

import br.ufpr.dto.ServidorDTO;
import br.ufpr.helper.PasswordUtils;
import br.ufpr.model.Servidor;
import br.ufpr.repository.ServidorRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "servidores")
public class ServidorREST {

    @Autowired
    private ServidorRepository repo;

    @Autowired
    private ModelMapper mapper;

    @GetMapping
    public ResponseEntity<List<ServidorDTO>> obterTodosServidores() {

        List<Servidor> lista = repo.findAll();

        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(lista.stream().map(e -> mapper.map(e, ServidorDTO.class)).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServidorDTO> buscaPorId(@PathVariable String id) {

        Optional<Servidor> servidor = repo.findById(id);
        if (servidor.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(mapper.map(servidor.get(), ServidorDTO.class));
        }
    }

    @PostMapping
    public ResponseEntity<ServidorDTO> inserirServidor(@RequestBody Servidor servidor) {

        try {
        	String salt = PasswordUtils.generateSalt();
        	servidor.setSalt(salt);
        	servidor.setSenha(PasswordUtils.hashPassword(servidor.getSenha(), salt));
            Servidor srv = repo.save(servidor);
            Optional<Servidor> srvOpt = repo.findById(srv.getId().toString());
            if (!srvOpt.isPresent()) {
                throw new Exception("Criação do servidor não foi realizada com sucesso");
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(srvOpt.get(), ServidorDTO.class));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServidorDTO> alterarServidor(@PathVariable("id") String id, @RequestBody Servidor servidor) {
        Optional<Servidor> srv = repo.findById(id);

        if (srv.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            servidor.setId(Long.parseLong(id));
            repo.save(servidor);
            srv = repo.findById(id);
            return ResponseEntity.status(HttpStatus.OK).body(mapper.map(srv.get(), ServidorDTO.class));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removerServidor(@PathVariable("id") String id) {

        Optional<Servidor> servidor = repo.findById(id);
        if (servidor.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } else {
            repo.delete(servidor.get());
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
    }
}
