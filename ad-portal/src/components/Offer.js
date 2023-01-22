import { useNavigate } from "react-router-dom";

const Offer = ({offer, onDelete}) => {
    const navigate = useNavigate();
    
    const goToEditPage = () => {
        navigate(`/edit/${offer.id}`);
    };
    
    return (
        <div>
            <h1>{offer.title}</h1>
            <p>{offer.description}</p>
            <button onClick={() => goToEditPage()}>Edit</button>
            <button onClick={() => onDelete(offer)}>Delete</button>
        </div>
    );
}

export default Offer;
