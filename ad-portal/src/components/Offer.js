const Offer = ({offer, onDelete}) => {
    return (
        <div>
            <h1>{offer.title}</h1>
            <p>{offer.description}</p>
            <button onClick={() => onDelete(offer)}>Delete</button>
        </div>
    );
}

export default Offer;
