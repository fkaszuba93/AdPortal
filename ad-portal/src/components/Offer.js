const Offer = ({offer}) => {
    return (
        <div>
            <h1>{offer.title}</h1>
            <p>{offer.description}</p>
        </div>
    );
}

export default Offer;
