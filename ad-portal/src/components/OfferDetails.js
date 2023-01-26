import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchOffer, formatDate } from '../util/OffersUtil';

const OfferDetails = () => {
    const [offer, setOffer] = useState({});
    const {id} = useParams();

    useEffect(() => {
        fetchOffer(id, setOffer);
    }, [id]);

    return (
        <div className="mx-5" style={{marginTop: "75px"}}>
            <h1>{offer.title}</h1>
            <div className="small">Created: {formatDate(offer.createDate)}</div>
            <p className="lead py-4">{offer.description}</p>
        </div>
    );
};

export default OfferDetails;