package cender.shop.BL.Services;

import cender.shop.BL.Enums.ServiceResultType;
import cender.shop.BL.Interfaces.EmailSender;
import cender.shop.BL.Utilities.ServiceResult;
import cender.shop.BL.Utilities.ServiceResultP;
import cender.shop.DL.Entities.Auth;
import cender.shop.DL.Repositories.AuthRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Service
@AllArgsConstructor
public class EmailConfirmationService implements EmailSender {

    @Autowired
    private  JavaMailSender mailSender;
    private AuthRepository _authRepository;


    public String generateToken(){
        return UUID.randomUUID().toString();
    }

    @Override
    @Async
    public void send(String to, String email){
        try{
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
            helper.setText(email, true);
            helper.setTo(to);
            helper.setSubject("Confirm your email");
            helper.setFrom("Admin");
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public ServiceResult confirmEmail(String token) {

        var auth = _authRepository.findByToken(token);
        var currentDate = Date.from(Instant.from(LocalDate.now()));
        if(auth.tokenExpirationDate.before(currentDate)&&currentDate.after(auth.tokenExpirationDate)) {
            return new ServiceResult(ServiceResultType.InvalidData, "Token has expired");
        }
        auth.emailConfirmed=true;
        _authRepository.updateAuth(auth);
        return new ServiceResult(ServiceResultType.Success);
    }

}
