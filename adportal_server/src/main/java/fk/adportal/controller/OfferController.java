package fk.adportal.controller;

import fk.adportal.model.Offer;
import fk.adportal.service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/offers")
public class OfferController {

    private final OfferService offerService;

    @Autowired
    public OfferController(OfferService offerService) {
        this.offerService = offerService;
    }

    @GetMapping(path = "/get-all")
    public Iterable<Offer> getAllOffers(){
        return offerService.getAllOffers();
    }

    @GetMapping(path = "/get-by-id")
    public Offer getOfferById(@RequestParam int id){
        return offerService.getOfferById(id);
    }

    @PostMapping(path = "/create")
    public Offer createOffer(@RequestBody Offer offer){
        return offerService.createOffer(offer);
    }

    @PutMapping(path = "/update")
    public void updateOffer(@RequestBody Offer offer){
        offerService.updateOffer(offer);
    }

    @PutMapping(path = "/update-views")
    public void updateViews(@RequestParam int id){
        offerService.updateViews(id);
    }

    @DeleteMapping
    public void deleteOffer(@RequestParam int id){
        offerService.deleteOffer(id);
    }
}
