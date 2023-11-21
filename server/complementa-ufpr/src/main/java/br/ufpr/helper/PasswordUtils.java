package br.ufpr.helper;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;

public class PasswordUtils {

    private static final SecureRandom RANDOM = new SecureRandom();
    private static final int SALT_LENGTH = 16;
    private static final int PASS_LENGTH = 8;

    public static String generateSalt() {
        byte[] salt = new byte[SALT_LENGTH];
        RANDOM.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }
    
    public static String generatePassword() {
        byte[] pass = new byte[PASS_LENGTH];
        RANDOM.nextBytes(pass);
        return Base64.getEncoder().encodeToString(pass);
    }

    public static String hashPassword(String password, String salt) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            digest.update(salt.getBytes(StandardCharsets.UTF_8));
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

    public static boolean checkPassword(String providedPassword, String storedHash, String storedSalt) {
        String hashedProvidedPassword = hashPassword(providedPassword, storedSalt);
        return hashedProvidedPassword.equals(storedHash);
    }
}
