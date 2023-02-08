package fk.adportal.controller;

import fk.adportal.json.OfferRequest;
import fk.adportal.json.OfferResponse;
import fk.adportal.model.Offer;
import fk.adportal.service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public List<OfferResponse> getAllOffers(){
        return offerService.getAllOffers();
    }

    @GetMapping(path = "/get-by-id")
    public OfferResponse getOfferById(@RequestParam int id){
        return offerService.getOfferById(id);
    }

    @PostMapping(path = "/create")
    public Offer createOffer(@RequestBody OfferRequest request){
        return offerService.createOffer(request);
    }

    @PutMapping(path = "/update")
    public void updateOffer(@RequestBody OfferRequest request){
        offerService.updateOffer(request);
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
