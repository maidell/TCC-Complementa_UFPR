package br.ufpr.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.ufpr.dto.AnexoDTO;
import br.ufpr.model.Anexo;
import br.ufpr.model.Atividade;
import br.ufpr.model.RelatorioDeConclusao;
import br.ufpr.repository.AnexoRepository;
import br.ufpr.repository.AtividadeRepository;
import br.ufpr.repository.RelatorioDeConclusaoRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "anexos")
public class AnexoREST {

	@Autowired
	private AnexoRepository repo;

	@Autowired
	private AtividadeRepository atRepo;
	
	@Autowired
	private RelatorioDeConclusaoRepository rcRepo;
	
	@Autowired
	private ModelMapper mapper;

	private static final String UPLOAD_DIRECTORY = "src/main/resources/binaries/";
	private static final SecureRandom RANDOM = new SecureRandom();
	
	@PostMapping("/atividades/upload/{atividadeId}")
	public ResponseEntity<AnexoDTO> uploadAnexoAtividade(@PathVariable Long atividadeId, @RequestParam("file") MultipartFile file) {
	    try {
	        String fileName = file.getOriginalFilename() + generateRandom();
	        String fileType = file.getContentType();
	        Path path = Paths.get(UPLOAD_DIRECTORY + fileName);
	        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

	        Anexo anexo = new Anexo();
	        anexo.setFileName(fileName);
	        anexo.setFilePath(path.toString());
	        anexo.setFileType(fileType);
	        
	        Optional<Atividade> atividade = atRepo.findById(atividadeId);
			if (!atividade.isPresent()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
			} else {
	        anexo.setRelatorioDeConclusao(new RelatorioDeConclusao((long) 1));
	        Anexo savedAnexo = repo.save(mapper.map(anexo, Anexo.class));
	        System.gc();
	        return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(savedAnexo, AnexoDTO.class));
			}
	    } catch (IOException e) {
	    	System.err.println(e);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}
	
	@PostMapping("/relatorios/upload/{relatorioId}")
	public ResponseEntity<AnexoDTO> uploadAnexoRelatorioDeConclusao(@PathVariable Long relatorioId, @RequestParam("file") MultipartFile file) {
	    try {
	    	String fileName = file.getOriginalFilename() + generateRandom();
	        String fileType = file.getContentType();
	        Path path = Paths.get(UPLOAD_DIRECTORY + fileName);
	        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

	        Anexo anexo = new Anexo();
	        anexo.setFileName(fileName);
	        anexo.setFilePath(path.toString());
	        anexo.setFileType(fileType);
	        
	        Optional<RelatorioDeConclusao> relatorio = rcRepo.findById(relatorioId);
			if (!relatorio.isPresent()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
			} else {
	        anexo.setRelatorioDeConclusao(new RelatorioDeConclusao(relatorioId));
	        Anexo savedAnexo = repo.save(mapper.map(anexo, Anexo.class));
	        System.gc();
	        return ResponseEntity.status(HttpStatus.CREATED).body(mapper.map(savedAnexo, AnexoDTO.class));
			}
	    } catch (IOException e) {
	    	System.err.println(e);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    } 
	}
	
	@GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadAnexo(@PathVariable Long id, HttpServletResponse response) {
        try {
            Optional<Anexo> anexoOpt = repo.findById(id);
            if (!anexoOpt.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            Anexo anexo = anexoOpt.get();
            Path path = Paths.get(anexo.getFilePath());
            if (!Files.exists(path)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            String contentType = Files.probeContentType(path);
            MediaType mediaType = MediaType.parseMediaType(contentType);
            File file = path.toFile();
            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                    .body(resource);
        } catch (Exception e) {
        	System.err.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
	
	@GetMapping("/{id}")
	public ResponseEntity<AnexoDTO> buscaPorId(@PathVariable Long id) {

		Optional<Anexo> anexo = repo.findById(id);
		if (!anexo.isPresent()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(mapper.map(anexo.get(), AnexoDTO.class));
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> removerAnexo(@PathVariable("id") Long id) {

		Optional<Anexo> anexo = repo.findById(id);
		if (!anexo.isPresent()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		} else {
			repo.delete(anexo.get());
			return ResponseEntity.status(HttpStatus.OK).body(null);
		}
	}
	
    public static String generateRandom() {
        byte[] salt = new byte[8];
        RANDOM.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }
}
