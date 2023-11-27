package br.ufpr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.model.Certificado;

public interface CertificadoRepository extends JpaRepository<Certificado, Long> {
    
	Optional<Certificado> findById(Long id);
    
	Optional<Certificado> findByHash(String hash);
	
}
