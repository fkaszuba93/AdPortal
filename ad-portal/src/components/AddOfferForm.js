import { useState } from 'react';

const AddOfferForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const addOffer = async () => {
        const offer = {title, description};
        await fetch('http://localhost:8080/offers', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(offer)
        });
    };

    const submit = (event) => {
        event.preventDefault();
        addOffer();
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
