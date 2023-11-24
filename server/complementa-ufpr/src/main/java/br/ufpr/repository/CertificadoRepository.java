package br.ufpr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpr.model.Certificado;

public interface CertificadoRepository extends JpaRepository<Certificado, String> {
    Optional<Certificado> findById(String id);
}
