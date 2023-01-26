import { useNavigate, Link } from "react-router-dom";

const Offer = ({offer, onDelete}) => {
    const navigate = useNavigate();
    
    const goToEditPage = () => {
        navigate(`/edit/${offer.id}`);
    };
    
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="w-75 mx-auto my-4 p-3 border rounded shadow">
            <Link to={`/offer/${offer.id}`} className="text-decoration-none">
                <h2 className="mb-3">{offer.title}</h2>
            </Link>
            <div className="my-2">Created: {formatDate(offer.createDate)}
                <span className="float-right">
                    <button className="btn btn-light mr-2" onClick={() => goToEditPage()}>Edit</button>
                    <button className="btn btn-light" onClick={() => onDelete(offer)}>Delete</button>
                </span>
            </div>
        </div>
    );
}

export default Offer;
