package fk.adportal.service;

import fk.adportal.model.Offer;
import fk.adportal.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void createOffer(Offer offer){
        offerRepository.save(offer);
    }
}
