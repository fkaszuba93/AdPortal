import Offer from './Offer';

const Offers = ({offers}) => {
  
    return (
      <div>
        <a href="/add">Add offer</a>
        {offers.map(offer => (
          <Offer key={offer.id} offer={offer} />
        ))}
      </div>
    );
};

export default Offers;
