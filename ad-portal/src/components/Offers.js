import { useState, useEffect } from 'react';
import Offer from './Offer';

const Offers = () => {
    const [offers, setOffers] = useState([]);
  
    useEffect(() => {
      const fetchOffers = async () => {
        const resp = await fetch('http://localhost:8080/');
        const offers = await resp.json();
        setOffers(offers);
      };
      fetchOffers();
    }, []);
  
    return (
      <div>
        {offers.map(offer => (
          <Offer key={offer.id} offer={offer} />
        ))}
      </div>
    );
};

export default Offers;
