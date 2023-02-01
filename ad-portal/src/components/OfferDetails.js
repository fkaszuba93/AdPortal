import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchOffer, formatDate, updateViews } from '../util/OffersUtil';

const OfferDetails = () => {
    const [offer, setOffer] = useState({});
    const [category, setCategory] = useState('');
    const {id} = useParams();

    useEffect(() => {
        if (offer.category){
            setCategory(offer.category.name);
        }
    }, [offer]);

    useEffect(() => {
        fetchOffer(id, setOffer);
        updateViews(id);
    }, [id]);

    return (
        <div className="mx-5" style={{marginTop: "75px"}}>
            {offer.error ? <h2>{offer.error}</h2>
            : <>
            <h1>{offer.title}</h1>
            <div className="small">Category: {category}</div>
            <div className="small">Created: {formatDate(offer.createDate)}</div>
            <p className="lead py-4">{offer.description}</p>
            </>}
        </div>
    );
};

export default OfferDetails;
