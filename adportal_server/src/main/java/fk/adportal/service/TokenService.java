package fk.adportal.service;

import fk.adportal.repository.TokenRepository;
import fk.adportal.security.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
public class TokenService {

    private final TokenRepository tokenRepository;

    @Autowired
    public TokenService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public void validateToken(Token requestToken){
        Token tokenInDb = tokenRepository.findById(requestToken.getUuid()).orElseThrow();

        if (tokenInDb.getUserId() != requestToken.getUserId()
                || !isDateTimeEqual(tokenInDb.getCreated(), requestToken.getCreated())
                || !isDateTimeEqual(tokenInDb.getExpires(), requestToken.getExpires())
                || LocalDateTime.now().isAfter(tokenInDb.getExpires())){

            throw new IllegalStateException("Invalid token");
        }
    }

    private boolean isDateTimeEqual(LocalDateTime a, LocalDateTime b){
        return a.truncatedTo(ChronoUnit.MICROS).isEqual(b.truncatedTo(ChronoUnit.MICROS));
    }
}
