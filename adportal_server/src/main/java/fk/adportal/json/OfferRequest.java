package fk.adportal.json;

import fk.adportal.model.Offer;

import java.util.HashMap;

public class OfferRequest extends HashMap<String, Object> {

    public OfferRequest(){
        super();
    }

    public Offer getOffer(){
        String title = (String) get("title"),
            description = (String) get("description");
        if (title == null || description == null){
            throw new IllegalStateException("Title and description required");
        }
        Offer offer = new Offer();
        offer.setTitle(title);
        offer.setDescription(description);
        return offer;
    }
}
