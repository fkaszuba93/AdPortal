package fk.adportal.json;

import fk.adportal.model.Offer;

import java.util.HashMap;

public class OfferResponse extends HashMap<String, Object> {

    public OfferResponse(Offer offer) {
        super();
        put("id", offer.getId());
        put("title", offer.getTitle());
        put("description", offer.getDescription());
        put("category", offer.getCategory());
        put("createDate", offer.getCreateDate());
        put("views", offer.getViews());
        put("user", new UserResponse(offer.getUser()));
    }
}
