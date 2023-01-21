import Offer from './Offer';

const Offers = ({offers, onDelete}) => {
  
    return (
      <div>
        <a href="/add">Add offer</a>
        {offers.map(offer => (
          <Offer key={offer.id} offer={offer} onDelete={onDelete} />
        ))}
      </div>
    );
};

export default Offers;
