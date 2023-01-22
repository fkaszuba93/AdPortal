import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const EditOfferForm = ({onSave}) => {
    const [offer, setOffer] = useState({title: '', description: ''});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fetched, setFetched] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const fetchOffer = async () => {
            const resp = await fetch(`http://localhost:8080/offers/get-by-id?id=${id}`);
            const offerFromServer = await resp.json();
            setOffer(offerFromServer);
        };

        if (id && !fetched){
            fetchOffer();
            setFetched(true);
        }
        
        setTitle(offer.title);
        setDescription(offer.description);
    }, [offer, id, fetched]);

    const submit = (event) => {
        event.preventDefault();

        offer.title = title;
        offer.description = description;
        onSave(offer);
        navigate('/');
    };

    return (
        <form onSubmit={submit}>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
                Description:
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <input type="submit" value="Save" />
        </form>
    );
};

export default EditOfferForm;
