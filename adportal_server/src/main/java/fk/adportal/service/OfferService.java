package fk.adportal.service;

import fk.adportal.json.OfferRequest;
import fk.adportal.json.OfferResponse;
import fk.adportal.model.Category;
import fk.adportal.model.Offer;
import fk.adportal.model.User;
import fk.adportal.repository.OfferRepository;
import fk.adportal.repository.TokenRepository;
import fk.adportal.repository.UserRepository;
import fk.adportal.security.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
public class OfferService {

    private final OfferRepository offerRepository;
    private final CategoryService categoryService;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    @Autowired
    public OfferService(OfferRepository offerRepository, CategoryService categoryService, UserRepository userRepository, TokenRepository tokenRepository) {
        this.offerRepository = offerRepository;
        this.categoryService = categoryService;
        this.userRepository = userRepository;
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
        User user = authUser(getUserToken(request));

        Offer offer = request.getOffer();
        offer.setCategory(getCategory(request));
        offer.setUser(user);

        return offerRepository.save(offer);
    }

    public void updateOffer(OfferRequest request){
        User user = authUser(getUserToken(request));

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
        User user = authUser(userToken);
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

    private Token getUserToken(OfferRequest request){
        String uuid = (String)((Map<?, ?>) request.get("userToken")).get("uuid");
        return tokenRepository.findById(uuid).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.UNAUTHORIZED)
        );
    }

    private User authUser(Token userToken){
        return userRepository.findById(userToken.getUserId()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.UNAUTHORIZED)
        );
    }
}
