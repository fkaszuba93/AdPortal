import { useState, useEffect } from 'react';
import Offer from './components/Offer';

function App() {
  const [offers, setOffers] = useState([]);
  
  useEffect(() => {
    const fetchOffers = async () => {
      const resp = await fetch('http://localhost:8080/');
      const offers = await resp.json();
      setOffers(offers);
    };
    fetchOffers();
  }, []);

  return (
    <div className="App">
      {offers.map(offer => (
        <Offer key={offer.id} offer={offer} />
      ))}
    </div>
  );
}

export default App;
