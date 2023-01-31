import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { fetchOffer } from '../util/OffersUtil';

const EditOfferForm = ({onSave}) => {
    const [offer, setOffer] = useState({title: '', description: ''});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fetched, setFetched] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id && !fetched){
            fetchOffer(id, setOffer);
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

    const cancel = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    const clear = () => {
        setTitle('');
        setDescription('');
    };

    return (
        <div className="w-75 px-5" style={{marginTop: "75px"}}>
            <button className="btn btn-light mb-3" onClick={clear}>Clear</button>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" className="form-control"
                        value={title} required onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" className="form-control" style={{height: "25rem"}}
                        value={description} required onChange={(e) => setDescription(e.target.value)} />
                </div>
                <input type="submit" value="Save" className="btn btn-light mr-3" />
                <button className="btn btn-light" onClick={cancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EditOfferForm;
