package fk.adportal.service;

import fk.adportal.json.OfferRequest;
import fk.adportal.json.OfferResponse;
import fk.adportal.model.Category;
import fk.adportal.model.Offer;
import fk.adportal.model.User;
import fk.adportal.repository.OfferRepository;
import fk.adportal.security.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
public class OfferService {

    private final OfferRepository offerRepository;
    private final CategoryService categoryService;
    private final UserService userService;
    private final TokenService tokenService;

    @Autowired
    public OfferService(OfferRepository offerRepository, CategoryService categoryService, UserService userService, TokenService tokenService) {
        this.offerRepository = offerRepository;
        this.categoryService = categoryService;
        this.userService = userService;
        this.tokenService = tokenService;
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
        Token token = getToken(request);
        validateToken(token);

        User user = userService.getUserByToken(token);

        Offer offer = request.getOffer();
        offer.setCategory(getCategory(request));
        offer.setUser(user);

        return offerRepository.save(offer);
    }

    public void updateOffer(OfferRequest request){
        Token token = getToken(request);
        validateToken(token);

        int id = (int) request.get("id");
        Offer offer = offerRepository.findById(id).orElseThrow();
        if (!Objects.equals(offer.getUser().getId(), token.getUserId())){
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
        validateToken(userToken);

        Offer offer = offerRepository.findById(id).orElseThrow();
        if (!Objects.equals(offer.getUser().getId(), userToken.getUserId())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        offerRepository.delete(offer);
    }

    private Category getCategory(OfferRequest request){
        int categoryId = (Integer) request.get("categoryId");
        return categoryService.getCategoryById(categoryId);
    }

    private Token getToken(OfferRequest request){
        Token token = new Token();

        Map<?, ?> requestToken = (Map<?, ?>) request.get("userToken");
        token.setUuid((String) requestToken.get("uuid"));
        token.setUserId((Integer) requestToken.get("userId"));
        token.setCreated(LocalDateTime.parse((String) requestToken.get("created")));
        token.setExpires(LocalDateTime.parse((String) requestToken.get("expires")));

        return token;
    }

    private void validateToken(Token token){
        try {
            tokenService.validateToken(token);
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
    }
}
