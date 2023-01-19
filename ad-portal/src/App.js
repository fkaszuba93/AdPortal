import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Offers from './components/Offers';
import AddOfferForm from './components/AddOfferForm';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route index element={<Offers />} />
        <Route path="/add" element={<AddOfferForm />} />
      </Routes>
    </Router>
  );
}

export default App;
