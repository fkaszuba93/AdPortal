package fk.adportal.controller;

import fk.adportal.model.Offer;
import fk.adportal.repository.OfferRepository;
import fk.adportal.service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/")
public class OfferController {

    private final OfferService offerService;

    @Autowired
    public OfferController(OfferService offerService) {
        this.offerService = offerService;
    }

    @GetMapping
    public Iterable<Offer> getAllOffers(){
        return offerService.getAllOffers();
    }

    @PostMapping
    public void createOffer(@RequestBody Offer offer){
        offerService.createOffer(offer);
    }
}
