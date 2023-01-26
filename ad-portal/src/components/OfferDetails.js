import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const OfferDetails = () => {
    const [offer, setOffer] = useState({});
    const {id} = useParams();

    useEffect(() => {
        const fetchOffer = async () => {
            const resp = await fetch(`http://localhost:8080/offers/get-by-id?id=${id}`);
            const offerFromServer = await resp.json();
            setOffer(offerFromServer);
        };

        fetchOffer();
    });

    return (
        <div className="mx-5" style={{marginTop: "75px"}}>
            <h1>{offer.title}</h1>
            <div className="small">Created: {offer.createDate}</div>
            <p className="lead py-4">{offer.description}</p>
        </div>
    );
};

export default OfferDetails;
