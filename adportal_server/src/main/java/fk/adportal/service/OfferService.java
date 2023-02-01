package fk.adportal.service;

import fk.adportal.model.Offer;
import fk.adportal.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class OfferService {

    private final OfferRepository offerRepository;

    @Autowired
    public OfferService(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }

    public Iterable<Offer> getAllOffers(){
        return offerRepository.findAll();
    }

    public Offer getOfferById(int id){
        Optional<Offer> offerInDb = offerRepository.findById(id);
        return offerInDb.get();
    }

    public Offer createOffer(Offer offer){
        return offerRepository.save(offer);
    }

    public void updateOffer(Offer updatedOffer){
        Optional<Offer> offerInDb = offerRepository.findById(updatedOffer.getId());
        if (offerInDb.isPresent()){
            offerRepository.save(updatedOffer);
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
