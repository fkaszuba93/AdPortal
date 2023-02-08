package fk.adportal.service;

import fk.adportal.json.OfferRequest;
import fk.adportal.json.OfferResponse;
import fk.adportal.model.Category;
import fk.adportal.model.Offer;
import fk.adportal.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class OfferService {

    private final OfferRepository offerRepository;
    private final CategoryService categoryService;

    @Autowired
    public OfferService(OfferRepository offerRepository, CategoryService categoryService) {
        this.offerRepository = offerRepository;
        this.categoryService = categoryService;
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
        Offer offer = request.getOffer();

        int categoryId = (int) request.get("categoryId");
        Category category = categoryService.getCategoryById(categoryId);
        offer.setCategory(category);

        return offerRepository.save(offer);
    }

    public void updateOffer(OfferRequest request){
        int id = (int) request.get("id");
        Optional<Offer> offerInDb = offerRepository.findById(id);
        if (offerInDb.isPresent()){
            Offer offer = offerInDb.get();

            offer.setTitle((String) request.get("title"));
            offer.setDescription((String) request.get("description"));
            Category category = categoryService.getCategoryById((int) request.get("categoryId"));
            offer.setCategory(category);

            offerRepository.save(offer);
        }
    }

    public void updateViews(int offerId){
        Optional<Offer> offerInDb = offerRepository.findById(offerId);
        if (offerInDb.isPresent()){
            Offer offer = offerInDb.get();
            offer.setViews(offer.getViews() + 1);
            offerRepository.save(offer);
        }
    }

    public void deleteOffer(int id){
        offerRepository.deleteById(id);
    }
}
