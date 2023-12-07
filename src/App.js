import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// pages routing
import Main from './pages/Main.js';
import SignUp from './pages/SignUp.js';
import LogIn from './pages/Login.js'
import { AddProducts } from './pages/AddProducts.js';
import { ProductsContext, ProductsContextProvider } from './global/ProductsContext';
import StaffDashboard from './pages/Staff_Dashboard.js';
import { MedicineProducts } from './pages/MedicineProducts.jsx';
import { CosmeticProducts } from './pages/CosmeticProducts.jsx';
import { HygieneProducts } from './pages/HygieneProducts.jsx';

function App() {
  return (
    <ProductsContextProvider>
      <Router>
        <div className="App">

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/medicine" element={<MedicineProducts />} />
            <Route path="/cosmetic" element={<CosmeticProducts />} />
            <Route path="/hygiene" element={<HygieneProducts />} />
            <Route path="/addproducts" element={<AddProducts />} />
            <Route path="/dashboard" element={<StaffDashboard />} />
          </Routes>

        </div>
      </Router>
    </ProductsContextProvider>
  );
}

export default App;