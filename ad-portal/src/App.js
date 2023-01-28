import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchOffers, createOffer, updateOffer, deleteOffer } from './util/OffersUtil';
import Header from './components/Header';
import Offers from './components/Offers';
import EditOfferForm from './components/EditOfferForm';
import OfferDetails from './components/OfferDetails';

function App() {
  const [offers, setOffers] = useState([]);
  
  useEffect(() => {
    fetchOffers(setOffers);
  }, []);

  const onCreateOffer = (offer) => {
    createOffer(offer, (newOffer) => {
      setOffers([...offers, newOffer]);
    });
  };

  const onUpdateOffer = async (offer) => {
    updateOffer(offer, (offer) => {
      setOffers(offers.map(o => 
        o.id === offer.id ? offer : o
      ));
    });
  };

  const odDeleteOffer = async (offer) => {
    deleteOffer(offer, (offer) => {
      setOffers(offers.filter(o => o.id !== offer.id));
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Offers offers={offers} onDelete={odDeleteOffer} />} />
          <Route path="/add" element={<EditOfferForm onSave={onCreateOffer} />} />
          <Route path="/edit/:id" element={<EditOfferForm onSave={onUpdateOffer} />} />
          <Route path="/offer/:id" element={<OfferDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
