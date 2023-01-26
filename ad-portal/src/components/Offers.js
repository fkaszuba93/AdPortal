import Offer from './Offer';

const Offers = ({offers, onDelete}) => {
  
    return (
      <div style={{marginTop: "75px"}}>
        <div className="text-center mb-4">
          <h1>Offers</h1>
        </div>
        {offers.map(offer => (
          <Offer key={offer.id} offer={offer} onDelete={onDelete} />
        ))}
      </div>
    );
};

export default Offers;
