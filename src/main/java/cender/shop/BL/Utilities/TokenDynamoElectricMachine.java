package cender.shop.BL.Utilities;

import org.springframework.stereotype.Service;

@Service
public class TokenDynamoElectricMachine {
    public String getToken(String rawHeader){
            return rawHeader.substring(7);
    }
}
