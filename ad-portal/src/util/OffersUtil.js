import { getUserToken } from './UserUtil';

export const offersURL = 'http://localhost:8080/offers';

export const fetchOffers = async (callback) => {
    const resp = await fetch(offersURL + '/get-all');
    const offers = await resp.json();
    callback(offers);
};

export const fetchOffer = async (id, callback) => {
    const resp = await fetch(offersURL + `/get-by-id?id=${id}`);
    const offerFromServer = await resp.json();
    callback(offerFromServer);
};

export const createOffer = async (offer, callback) => {
    const resp = await fetch(offersURL + '/create', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(offer)
    });
    const newOffer = await resp.json();
    callback(newOffer);
};

export const updateOffer = async (offer, callback) => {
    await fetch(offersURL + '/update', {
        method: 'PUT',
        headers: {
        'Content-type': 'application/json',
        },
        body: JSON.stringify(offer)
    });
    callback(offer);
};

export const updateViews = async (offerId) => {
    fetch(offersURL + `/update-views?id=${offerId}`, {
        method: 'PUT'
    });
};

export const deleteOffer = async (offer, callback) => {
    await fetch(offersURL + `?id=${offer.id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(getUserToken())
    });
    callback(offer);
};

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};
