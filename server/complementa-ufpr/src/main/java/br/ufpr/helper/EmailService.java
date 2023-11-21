package br.ufpr.helper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

	private JavaMailSender mailSender;
	
	@Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void enviarEmail(String para, String assunto, String conteudo) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("complementa@ufpr.br");
        message.setTo(para);
        message.setSubject(assunto);
        message.setText(conteudo);
        mailSender.send(message);
    }
}
