package cender.shop.PL.Controllers;

import cender.shop.BL.Enums.ServiceResultType;
import cender.shop.BL.Services.EmailConfirmationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Component
@RestController()
@RequestMapping("api/email/")

public class EmailConfirmationController {

    private EmailConfirmationService _emailService;

    @GetMapping("confirm")
    public ResponseEntity ConfirmEmail( @RequestParam String token) {
        var result  = _emailService.confirmEmail(token);
        if(result.Result!= ServiceResultType.Success)
        {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.noContent().build();
    }
}
