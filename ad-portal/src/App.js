import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Offers from './components/Offers';
import AddOfferForm from './components/AddOfferForm';

function App() {
  const [offers, setOffers] = useState([]);
  const offersURL = 'http://localhost:8080/offers';
  
  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    const resp = await fetch(offersURL);
    const offers = await resp.json();
    setOffers(offers);
  };

  const addOffer = async (offer) => {
    const resp = await fetch(offersURL, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(offer)
    });
    const newOffer = await resp.json();
    setOffers([...offers, newOffer]);
  };

  return (
    <Router>
      <Routes>
        <Route index element={<Offers offers={offers} />} />
        <Route path="/add" element={<AddOfferForm addOffer={addOffer} />} />
      </Routes>
    </Router>
  );
}

export default App;
