import Offer from './Offer';

const Offers = ({offers, onDelete}) => {
  
    return (
      <div style={{marginTop: "75px"}}>
        {offers.map(offer => (
          <Offer key={offer.id} offer={offer} onDelete={onDelete} />
        ))}
      </div>
    );
};

export default Offers;
