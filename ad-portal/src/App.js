import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Offers from './components/Offers';
import EditOfferForm from './components/EditOfferForm';
import OfferDetails from './components/OfferDetails';

function App() {
  const [offers, setOffers] = useState([]);
  const offersURL = 'http://localhost:8080/offers';
  
  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    const resp = await fetch(offersURL + '/get-all');
    const offers = await resp.json();
    setOffers(offers);
  };

  const addOffer = async (offer) => {
    const resp = await fetch(offersURL + '/create', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(offer)
    });
    const newOffer = await resp.json();
    setOffers([...offers, newOffer]);
  };

  const updateOffer = async (offer) => {
    await fetch(offersURL + '/update', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(offer)
    });
    var index = offers.findIndex(o => o.id === offer.id);
    offers[index] = offer;
    setOffers(offers);
  };

  const deleteOffer = async (offer) => {
    await fetch(offersURL + `?id=${offer.id}`, {
      method: 'DELETE'
    });
    setOffers(offers.filter(o => o.id !== offer.id));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Offers offers={offers} onDelete={deleteOffer} />} />
          <Route path="/add" element={<EditOfferForm onSave={addOffer} />} />
          <Route path="/edit/:id" element={<EditOfferForm onSave={updateOffer} />} />
          <Route path="/offer/:id" element={<OfferDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
