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

import br.ufpr.dto.CertificadoDTO;
import br.ufpr.helper.CertificadoHasher;
import br.ufpr.model.Certificado;
import br.ufpr.repository.CertificadoRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "certificados")
public class CertificadoREST {

	@Autowired
	private CertificadoRepository repo;

	@Autowired
	private ModelMapper mapper;

	@GetMapping
	public ResponseEntity<List<CertificadoDTO>> obterTodosCertificados() {

		List<Certificado> lista = repo.findAll();

		if (lista.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(lista.stream().map(e -> mapper.map(e, CertificadoDTO.class)).collect(Collectors.toList()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<CertificadoDTO> buscaPorId(@PathVariable Long id) {

		Optional<Certificado> certificado = repo.findById(id);
		if (certificado.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(certificado.get(), CertificadoDTO.class));
		}
	}
	
	@GetMapping("/consultas/{hash}")
	public ResponseEntity<CertificadoDTO> buscaPorHash(@PathVariable String hash) {

		Optional<Certificado> certificado = repo.findByHash(hash);
		if (certificado.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(certificado.get(), CertificadoDTO.class));
		}
	}
	
	@PostMapping
	public ResponseEntity<CertificadoDTO> inserirCertificado(@RequestBody Certificado certificado) {
		Certificado crt = mapper.map(certificado, Certificado.class);
		crt.setSalt(CertificadoHasher.generateSalt());
		crt.setHash(CertificadoHasher.hashCertificate(certificado, crt.getSalt()));
		try {
			crt = repo.save(crt);
			Optional<Certificado> crtOpt = repo.findById(crt.getId());
			if (!crtOpt.isPresent()) {
				throw new Exception("Criação do certificado não foi realizada com sucesso");
			}
			return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(crtOpt.get(), CertificadoDTO.class));
		} catch (Exception e) {
			System.err.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<CertificadoDTO> alterarCertificado(@PathVariable("id") Long id, @RequestBody Certificado certificado) {
		Optional<Certificado> crt = repo.findById(id);

		if (crt.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			certificado.setId(id);
			repo.save(mapper.map(certificado, Certificado.class));
			crt = repo.findById(id);
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(crt.get(), CertificadoDTO.class));
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> removerCertificado(@PathVariable("id") Long id) {

		Optional<Certificado> certificado = repo.findById(id);
		if (certificado.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			repo.delete(certificado.get());
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
	}
}
