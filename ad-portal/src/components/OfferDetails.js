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
        <div className="mx-5" style={{marginTop: "5rem"}}>
            {offer.error ? <h2>{offer.error}</h2>
            : <>
            <div className="container-fluid">
                <h1>{offer.title}</h1>
                <div className="small">Category: {category}</div>
                <div className="small">Created: {formatDate(offer.createDate)}</div>
                <div className="row">
                    <div className="col-lg-9">
                        <p className="lead py-4">{offer.description}</p>
                    </div>
                    <div className="col-lg-3">
                        <div className="ml-3 my-4 p-4 border rounded bg-light">
                            <div>Posted by: <span className="text-primary font-weight-bold">{offer.user?.username}</span></div>
                            <div>email: <span className="font-weight-bold">{offer.user?.email}</span></div>
                            {offer.user?.phone && <div>phone: <span className="font-weight-bold">{offer.user?.phone}</span></div>}
                        </div>
                    </div>
                </div>
            </div></>}
        </div>
    );
};

export default OfferDetails;
