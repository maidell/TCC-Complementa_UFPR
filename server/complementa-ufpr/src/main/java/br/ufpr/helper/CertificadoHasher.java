package br.ufpr.helper;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;

import br.ufpr.model.Certificado;

public class CertificadoHasher {
	
	private static final SecureRandom RANDOM = new SecureRandom();
    private static final int SALT_LENGTH = 16;
       
    public static String generateSalt() {
        byte[] salt = new byte[SALT_LENGTH];
        RANDOM.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }
    
    public static String hashCertificate(Certificado certificado, String salt) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            digest.update(salt.getBytes(StandardCharsets.UTF_8));
            String str = certificado.getNome() + certificado.getOrientador() + certificado.getHoras() + certificado.getProjeto();
            byte[] hash = digest.digest(str.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

    public static boolean checkHash(Certificado certificado, String storedSalt) {
        String hashedProvidedPassword = hashCertificate(certificado, storedSalt);
        return hashedProvidedPassword.equals(certificado.getHash());
    }
}
