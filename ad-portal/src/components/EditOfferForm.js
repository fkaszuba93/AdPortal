import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { fetchOffer } from '../util/OffersUtil';
import {fetchCategories} from '../util/CategoriesUtil';
import { isUserLoggedIn } from '../util/UserUtil';

const EditOfferForm = ({onSave}) => {
    const [offer, setOffer] = useState({title: '', description: ''});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [fetched, setFetched] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (!isUserLoggedIn()){
            navigate('/log-in');
        }
        
        if (id && !fetched){
            fetchOffer(id, setOffer);
            setFetched(true);
        }
        
        setTitle(offer.title);
        setDescription(offer.description);

        fetchCategories(setCategories);

        if (offer.category){
            setCategoryId(offer.category.id);
        }
    }, [offer, id, fetched, navigate]);

    const submit = (event) => {
        event.preventDefault();

        offer.title = title;
        offer.description = description;
        offer.category = {id: categoryId};
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
        setCategoryId('');
    };

    return (
        <div className="w-75" style={{margin: "5rem"}}>
            <button className="btn btn-light mb-3" onClick={clear}>Clear</button>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" className="form-control"
                        value={title} required onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select id="category" className="form-control" 
                        value={categoryId} required onChange={(e) => setCategoryId(e.target.value)}>
                        
                        <option value="" disabled hidden>Select category</option>
                        {categories.map(category => 
                        <option value={category.id} key={category.id}>{category.name}</option>
                        )}
                    </select>
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
