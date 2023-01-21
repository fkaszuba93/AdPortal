import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AddOfferForm = ({addOffer}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const submit = (event) => {
        event.preventDefault();
        addOffer({title, description});
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

export default AddOfferForm;
