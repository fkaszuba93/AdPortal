package fk.adportal.service;

import fk.adportal.json.OfferRequest;
import fk.adportal.json.OfferResponse;
import fk.adportal.model.Category;
import fk.adportal.model.Offer;
import fk.adportal.model.User;
import fk.adportal.repository.OfferRepository;
import fk.adportal.repository.TokenRepository;
import fk.adportal.security.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
public class OfferService {

    private final OfferRepository offerRepository;
    private final CategoryService categoryService;
    private final UserService userService;
    private final TokenRepository tokenRepository;

    @Autowired
    public OfferService(OfferRepository offerRepository, CategoryService categoryService, UserService userService, TokenRepository tokenRepository) {
        this.offerRepository = offerRepository;
        this.categoryService = categoryService;
        this.userService = userService;
        this.tokenRepository = tokenRepository;
    }

    public List<OfferResponse> getAllOffers(){
        return ((List<Offer>)offerRepository.findAll())
                .stream().map(OfferResponse::new).toList();
    }

    public OfferResponse getOfferById(int id){
        Optional<Offer> offerInDb = offerRepository.findById(id);
        if (offerInDb.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return new OfferResponse(offerInDb.get());
    }

    public Offer createOffer(OfferRequest request){
        User user = userService.authUser(validateToken(request));

        Offer offer = request.getOffer();
        offer.setCategory(getCategory(request));
        offer.setUser(user);

        return offerRepository.save(offer);
    }

    public void updateOffer(OfferRequest request){
        User user = userService.authUser(validateToken(request));

        int id = (int) request.get("id");
        Offer offer = offerRepository.findById(id).orElseThrow();
        if (!Objects.equals(offer.getUser().getId(), user.getId())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        offer.setTitle((String) request.get("title"));
        offer.setDescription((String) request.get("description"));
        offer.setCategory(getCategory(request));

        offerRepository.save(offer);
    }

    public void updateViews(int offerId){
        Optional<Offer> offerInDb = offerRepository.findById(offerId);
        if (offerInDb.isPresent()){
            Offer offer = offerInDb.get();
            offer.setViews(offer.getViews() + 1);
            offerRepository.save(offer);
        }
    }

    public void deleteOffer(int id, Token userToken){
        User user = userService.authUser(userToken);
        Offer offer = offerRepository.findById(id).orElseThrow();
        if (!Objects.equals(offer.getUser().getId(), user.getId())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        offerRepository.delete(offer);
    }

    private Category getCategory(OfferRequest request){
        int categoryId = (Integer) request.get("categoryId");
        return categoryService.getCategoryById(categoryId);
    }

    private Token validateToken(OfferRequest request){
        Map<?, ?> requestToken = (Map<?, ?>) request.get("userToken");
        String uuid = (String) requestToken.get("uuid");
        int userId = (Integer) requestToken.get("userId");
        LocalDateTime created = LocalDateTime.parse((String) requestToken.get("created"));
        LocalDateTime expires = LocalDateTime.parse((String) requestToken.get("expires"));

        Token token = tokenRepository.findById(uuid).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.UNAUTHORIZED)
        );

        if (token.getUserId() != userId || !isDateTimeEqual(token.getCreated(), created)
            || !isDateTimeEqual(token.getExpires(), expires) || LocalDateTime.now().isAfter(token.getExpires())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        return token;
    }

    private boolean isDateTimeEqual(LocalDateTime a, LocalDateTime b){
        return a.truncatedTo(ChronoUnit.MICROS).isEqual(b.truncatedTo(ChronoUnit.MICROS));
    }
}
