import { useState } from 'react';
import Offer from './Offer';
import Search from './Search';

const Offers = ({offers, onDelete}) => {
	const [query, setQuery] = useState('');

	const filteredOffers = query ? offers.filter(offer => 
		offer.title.toLowerCase().includes(query.toLowerCase())
	) : offers;

    return (
      <div style={{marginTop: "75px"}}>
        <Search onQueryChange={setQuery} />
        <div className="text-center mb-4">
          <h1>Offers</h1>
        </div>
        {filteredOffers.map(offer => (
          <Offer key={offer.id} offer={offer} onDelete={onDelete} />
        ))}
      </div>
    );
};

export default Offers;
